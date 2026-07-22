# Ayanfe's Code Review — NIIT Project

**Reviewed:** 22 July 2026
**Scope:** Code-level review only (architecture, correctness, practices, security, performance, a11y). UI/visual feedback is deliberately excluded — that's a separate conversation.
**Commit reviewed:** `47f1f2e` — *"wired all data to contentful while still maintaining my mock data"*
**Verified by:** full read of all 61 source files, `tsc --noEmit`, `eslint`, `next build`, and a live probe against the Contentful space.

---

## Executive summary

The project builds, typechecks clean, and the rendering-strategy story (SSG / ISR / SSR / CSR) is genuinely well thought out — that part shows real understanding and is the strongest thing here. The routing, `generateStaticParams`, and metadata work is mostly correct and idiomatic for Next 16.

The problems are not architectural, they're **discipline** problems: debug code shipped to production, ~11 dead files including near-duplicates of live components, hardcoded mock data sitting alongside the real CMS data it's supposed to have replaced, 9 broken image references, and a swallow-all-errors pattern that hides CMS outages behind fake data.

None of these are hard to fix. Most are 10-minute fixes. But collectively they're the difference between "a student project that works" and "code I'd let into a release branch."

**Verdict:** Solid foundation, not shippable as-is. Blockers below must be cleared first.

| Severity | Count |
|---|---|
| 🔴 Blocker — must fix before any deploy | 6 |
| 🟠 Major — fix this sprint | 9 |
| 🟡 Moderate — should fix | 11 |
| 🔵 Minor / polish | 8 |

---

## 🔴 Blockers

### 1. Debug code executing at module scope in production

`lib/contentful.ts:843-844`

```ts
const staff = await getAllStaff();
console.log(JSON.stringify(staff, null, 2));
```

This is a **top-level await plus a console dump at the bottom of the data layer**. Every single module that imports anything from `lib/contentful.ts` — which is 15 of the app's files, i.e. nearly every page — triggers a live Contentful API call and dumps the full staff list to the server log.

It is duplicated a second time in the page body:

`app/home/page.tsx:33-34`
```ts
const staff = await getAllStaff();
console.log(JSON.stringify(staff, null, 2));
```

**Confirmed by running `next build`** — real staff records print twice to the build log, including real email addresses:

```
[ { "id": "2VqUCwI9P8qhfrnPsQGk3R", "name": "Dr Tunde Hassan ",
    "email": "tunde@gmail.com", ... } ]
```

Three separate problems, any one of which is disqualifying:
- **Performance** — an unnecessary blocking network round-trip on the import path of every route. Top-level await also delays module evaluation for every consumer.
- **Data leak** — staff names and emails written to build/server logs, which in most hosting setups (Vercel, CI) are retained and visible to anyone with dashboard access.
- **Dead work** — the `staff` variable is never used in either location. It's pure waste.

**Fix:** delete both. Then add a `no-console` lint rule so it can't happen again.

---

### 2. Contentful errors are swallowed and silently replaced with fake data

The pattern repeats in **8 functions** across `lib/contentful.ts`:

```ts
} catch (error) {
  console.error("Error fetching latest news from Contentful:", error);
}
// falls through
return MOCK_NEWS.slice(0, limit);
```

If Contentful is down, the token is revoked, or the content model changes, the site does not error — it **silently serves 800 lines of hardcoded mock data** and looks completely fine.

This is much worse than it sounds, because I verified the mock data is a near-clone of the real CMS data. The live space contains:

```
newsArticle  => total 3  [ 'scholarship-applications-2026',
                           'new-engineering-lab-opens',
                           'niit-wins-best-university-award-2025' ]
faculty      => total 4  [ 'information-technology', 'business-administration', ... ]
```

Those are the *exact same slugs* as `MOCK_NEWS` and `MOCK_FACULTIES`. So a total CMS outage produces a page that is visually and structurally identical to a healthy one. **Nobody would ever notice.** You'd find out weeks later when an editor asks why their new article never appeared.

**Fix:** pick one behaviour and be explicit about it.
- Preferred: let the error throw and handle it with an `error.tsx` boundary, so failures are loud.
- If a fallback is genuinely wanted, gate it on `process.env.NODE_ENV !== "production"` so mocks can never reach users, and emit a real alert (Sentry etc.) on the catch.

Either way, mock fixtures do not belong in the same file as the production client. Move them to `lib/__fixtures__/`.

---

### 3. Real CMS images are silently discarded

`app/academics/[faculty]/page.tsx:45-51`

```ts
function getFacultyImage(coverImage: string, index = 0) {
  if (coverImage.endsWith(".jpg")) {
    return fallbackImages[index % fallbackImages.length];  // local PNG
  }
  return coverImage;
}
```

A Contentful asset URL looks like `https://images.ctfassets.net/abc/xyz/campus-photo.jpg`. It ends in `.jpg`. So **every JPEG an editor uploads to Contentful is thrown away** and replaced with a hardcoded local `Class1.png`.

This was presumably written to dodge the broken local placeholder paths (see #4), but it now actively breaks the CMS integration that commit `47f1f2e` was written to deliver. The moment a real photo is uploaded, it won't show.

The same class of bug appears three more times as string-sniffing on filenames:

- `app/news/[slug]/page.tsx:43` — `article.coverImage.includes("placeholder")`
- `app/news/page.tsx:35` — same
- `app/events/page.tsx:41` — same
- `app/about/page.tsx:86` — `photo.includes("placeholder")`

Any editor who names a real asset `placeholder-hero.jpg` gets it silently swapped out.

**Fix:** never branch on a URL's file extension or filename substring. Handle a genuinely missing image explicitly — `coverImage || FALLBACK` at the mapping layer in `lib/contentful.ts`, or a nullable `coverImage?: string` in the type and a real conditional in the component.

---

### 4. Nine of thirteen referenced images do not exist

Referenced across the codebase vs. what's actually in `public/images/`:

| Referenced | Exists? | Used by |
|---|---|---|
| `Class1.png` | ✅ | mocks, academics |
| `Class2.png` | ✅ | mocks, academics |
| `MD.png` | ✅ | gallery mock |
| `NIIT.webp` | ✅ | hero, about, campus-life |
| `Class1.jpg` | ❌ | `MOCK_FACULTIES` (`.jpg` vs `.png` typo) |
| `og-image.jpg` | ❌ | **every page's OG/Twitter card** |
| `why-us-1.jpg` | ❌ | `WhyChooseUs.tsx:30` |
| `why-us-2.jpg` | ❌ | `WhyChooseUs.tsx:37` |
| `news-placeholder.jpg` | ❌ | news fallbacks |
| `event-placeholder.jpg` | ❌ | event fallbacks |
| `leader-placeholder.jpg` | ❌ | leadership |
| `avatar-placeholder.jpg` | ❌ | article authors |
| `staff-placeholder.jpg` | ❌ | staff directory |

`og-image.jpg` is the notable one — `lib/metadata.ts:16` sets it as the default for every OG and Twitter card on the site. **Every social share of this site currently shows a broken preview image.**

`why-us-1.jpg` / `why-us-2.jpg` are plain broken `<img>` tags on the homepage — two visibly broken images above the fold on the most important page.

**Fix:** add the assets, or point them at what exists. Then add a build-time check that every string literal matching `/images/...` resolves to a real file.

---

### 5. Eleven dead files, including confusable near-duplicates of live components

I traced the full import graph. These files are imported by nothing:

| Dead file | Notes |
|---|---|
| `components/home/UpcomingNeews.tsx` | **Byte-identical** to the live `UpcomingEvents.tsx`, exports the same symbol name |
| `components/home/LatestNews.tsx` | Old version; live one is `LatestNewss.tsx` |
| `components/home/FeaturedFaculties.tsx` | Old version; live one is `FeaturedFacuulties.tsx` |
| `components/home/About.tsx` | Baobab University content (see #6) |
| `components/home/Hero.tsx` | Superseded by `HeroSection.tsx` |
| `components/home/HeroComponents.tsx` | Carousel — only imported by dead `Hero.tsx` |
| `components/layout/Nav.tsx` | Only imported by dead `Hero.tsx` |
| `constants/Navlink.ts` | Superseded by `constants/nav.ts` |
| `lib/conntentful.ts` | Typo'd duplicate of `lib/contentful.ts` |
| `lib/api/faculties.ts` | Superseded by functions in `lib/contentful.ts` |
| `types/index.ts` | Superseded by `types/*.ts` (see #7) |

This is genuinely dangerous, not just untidy. Look at the homepage imports:

`app/home/page.tsx:4-5`
```ts
import { FeaturedFaculties } from "@/components/home/FeaturedFacuulties";  // 3 u's
import { LatestNews } from "@/components/home/LatestNewss";                 // 2 s's
```

**The typo'd filenames are the live ones.** The correctly-spelled files are the dead ones. Any developer — including you in three months — who opens `FeaturedFaculties.tsx` to fix a bug will edit dead code and wonder why nothing changes. And the dead correctly-spelled version has its own bug baked in:

`components/home/FeaturedFaculties.tsx:32`
```ts
dscription: "Excellence in arts, literature, history, and cultural studies.",
```

Typo'd key, so `faculty.description` renders `undefined` for that card. It's invisible today only because the file is dead.

**Fix:** delete all eleven. Then rename `FeaturedFacuulties.tsx` → `FeaturedFaculties.tsx` and `LatestNewss.tsx` → `LatestNews.tsx`. A file's name is API — treat typos in it as bugs, not cosmetics.

Note this also makes `embla-carousel-react` and `embla-carousel-autoplay` dead dependencies — they're only used by the dead `HeroComponents.tsx`. Two packages shipped in the lockfile for zero runtime benefit.

---

### 6. Placeholder and wrong-brand copy in shipped code

The site is for **NIIT**. These strings are live or near-live:

`components/home/About.tsx:35,38` (dead file, but committed):
```
"About Baobab University"
"Since then, Baobab University has grown into a vibrant academic community..."
```
`components/home/LatestNews.tsx:7,24` (dead file): "Baobab University Doubles Mental Health Support Services", "Baobab students showcase..."

Clearly lifted from a template and never rebranded.

**Live on the homepage right now:**

`components/home/AboutSnippet.tsx:23` — headline reads:
> "Creator of Underrated Graduated"

That is not a sentence. It's on the homepage, in an `<h2>`, at the top of the About section.

`components/home/AboutSnippet.tsx:26` — the body text beneath it is **lorem ipsum**:
> "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore..."

`constants/stats.ts:13,19,25` — all three hero stat descriptions are lorem ipsum, rendered in the red stats bar at the bottom of the hero:
```ts
label: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor.",
```

**Fix:** real copy everywhere. Add a CI grep for `lorem ipsum` / `Baobab` so this can't ship.

---

## 🟠 Major

### 7. Two parallel, mutually incompatible type systems

`types/index.ts` defines `NewsArticle`, `Faculty`, `Leader`, `GalleryImage` — and so do `types/news.ts`, `types/faculty.ts`, `types/leader.ts`, `types/gallery.ts`. **The shapes contradict each other:**

```ts
// types/index.ts                    // types/faculty.ts  (the live one)
interface Faculty {                  interface Faculty {
  students: string                     studentCount: number
  programs: string                     programCount: number
  icon: string                         shortName: string
}                                      dean: string
                                       featuredPrograms: string[]
                                     }
```

Nothing imports `types/index.ts` (verified — zero `from "@/types"` imports). It's a leftover of the pre-CMS design. But a barrel file named `index.ts` in `types/` is *exactly* where the next developer will look first, and they'll get the wrong `Faculty`.

**Fix:** delete `types/index.ts`. If you want a barrel, make it re-export the real modules: `export * from "./faculty"` etc.

---

### 8. `revalidate` + `dynamicParams = false` means new CMS content 404s forever

`app/news/[slug]/page.tsx:9-10`
```ts
export const revalidate = 3600;
export const dynamicParams = false;
```

Same pairing in `app/courses/[slug]`, `app/faculties/[faculty]`, `app/faculties/[faculty]/[department]`, `app/academics/[faculty]`.

`dynamicParams = false` means: any slug not returned by `generateStaticParams()` **at build time** returns a 404. `revalidate` refreshes the *content* of already-known pages, but it does not add new paths.

So when an editor publishes a new article in Contentful, `/news/their-new-slug` is a hard 404 until someone triggers a redeploy. That contradicts the README, which advertises news as ISR precisely so "editors can publish updates" without a rebuild.

**Fix:** for CMS-driven routes, drop `dynamicParams = false` (the default `true` renders unknown slugs on demand and caches them) and keep `notFound()` for genuinely missing content — which is already correctly in place at `app/news/[slug]/page.tsx:25`.

---

### 9. Unsanitised `dangerouslySetInnerHTML` on CMS content

`app/news/[slug]/page.tsx:53`
```tsx
<div dangerouslySetInnerHTML={{ __html: article.body }} />
```

`article.body` comes from `documentToHtmlString()` on a Contentful rich-text field. Contentful's renderer does not sanitise — it will faithfully emit an `<a href="javascript:...">` from a hyperlink node, and if the content model is ever changed to a plain Text field (a one-click change in the Contentful UI, no code deploy) the field becomes a raw HTML injection point.

The threat model is "a CMS editor account, or anyone who compromises one" — not anonymous internet. That makes it lower urgency than an unauthenticated XSS, but it's still a stored-XSS path on a public university site, and CMS accounts at institutions are not tightly held.

**Fix:** sanitise before rendering. `isomorphic-dompurify` on the server, or pass a custom `renderNode` config to `documentToHtmlString` with an allowlist and a `javascript:` scheme check on hyperlinks.

---

### 10. Both forms are fake — they submit to nothing

`app/contact/ContactForm.tsx:44-49`
```ts
async function onSubmit() {
  setStatus("idle");
  await new Promise((resolve) => setTimeout(resolve, 700));  // fake latency
  setStatus("success");
  reset();
}
```

No network call. No API route. No server action. The user sees **"Message sent. Our admissions team will reply soon."** and their enquiry is discarded. On a university site, that's a prospective student who thinks they've contacted admissions and never hears back.

Note also the callback ignores its `data` argument entirely — react-hook-form validated the input and then it was thrown away.

The `"error"` branch (`ContactForm.tsx:102-106`) is unreachable dead code — `setStatus("error")` is never called anywhere.

Same story in `components/home/CTABanner.tsx:9-15` — the newsletter form sets `submitted = true` and drops the email.

**Fix:** wire to a server action or API route with real error handling, or disable the forms with an honest "coming soon" state. Shipping a form that silently eats user input is worse than shipping no form.

---

### 11. `/` and `/home` are duplicate indexable pages

`app/page.tsx`
```tsx
import Image from "next/image";        // unused
import { redirect } from 'next/navigation'

export default function Home() {
  return (
    redirect('/home')                  // redirect() throws; wrapping in return is misleading
  );
}
```

The build output confirms both routes exist and are prerendered:
```
├ ○ /
├ ○ /home       1h   1y
```

Three problems:
- **SEO:** `/home` is fully indexable, and `app/home/page.tsx:22` sets its canonical to `path: "/"` — so the canonical points at a URL that immediately redirects away. Search engines get contradictory signals.
- **Performance:** every visitor to the site root eats an extra redirect hop before any HTML.
- **Navigation:** `NAV_LINKS[0]` and the header logo both link to `/`, so every "Home" click pays the redirect.

There is also no reason for the split — `app/home/layout.tsx` is a pass-through that adds a bare `<div>` and nothing else.

**Fix:** move the contents of `app/home/page.tsx` into `app/page.tsx`, delete `app/home/` entirely.

---

### 12. Broken link target: `/events/[slug]` route doesn't exist

`components/home/UpcomingEvents.tsx:39`
```tsx
href={event.registrationLink ?? `/events/${event.slug}`}
```

There is no `app/events/[slug]/` directory — only `app/events/page.tsx`. Any event without a `registrationLink` links to a 404.

The mock events all happen to have `registrationLink` set, which masks it locally. But the live CMS has `universityEvent` entries (I confirmed 3, including `2026-convocation-ceremony`), and there's no guarantee editors fill that optional field — the type marks it `registrationLink?: string`.

**Fix:** build the `/events/[slug]` detail page, or drop the fallback and only render a link when `registrationLink` exists.

---

### 13. Implementation notes shipped as user-facing copy

Multiple pages render internal architecture commentary in the visible page description, where prospective students will read it:

- `app/news/page.tsx:25` — *"The news listing uses ISR so editors can publish updates without forcing every request to render from scratch."*
- `app/staff/page.tsx:30` — *"The staff directory uses SSR so filters and staff records can reflect fresh CMS changes on every request."*
- `app/events/page.tsx:30` — *"Events use SSR because dates, registration state, and time-sensitive displays need to be fresh on each request."*
- `app/courses/page.tsx:19` — *"Courses are SSG because details change slowly and are important for search visibility."*
- `app/gallery/page.tsx:18` — *"The gallery is statically generated and uses next/image for sizing, lazy loading, and responsive delivery."*
- `app/contact/page.tsx:17` — *"The form uses a client component with React Hook Form and Zod validation for immediate UX feedback."*
- `app/faculties/[faculty]/page.tsx:45` — *"All faculty department pages are prerendered from CMS slugs with generateStaticParams."*
- `app/search/page.tsx:46` — *"Search runs in the browser with debounced client-side filtering over a prepared content index."*

This is README material that ended up in the JSX. It reads as unfinished to any visitor and it's indexed by search engines as the page description.

**Fix:** move to the README (where most of it already exists) and write real, audience-appropriate copy.

---

### 14. 43 ESLint errors, all `no-explicit-any`, all in the data layer

```
lib/contentful.ts    41 errors
lib/api/faculties.ts  2 errors
```

The mapping code is `any` end-to-end:

```ts
const entries = await contentfulClient.getEntries<any>({ ... });
return entries.items.map((item: any) => ({
  coverImage: (item.fields.coverImage as any)?.fields?.file?.url ...
```

TypeScript is doing nothing here. `tsc --noEmit` passes clean, but that's meaningless — every field access in the entire CMS boundary is unchecked. If Contentful renames a field, you get `undefined` rendered into the page at runtime with zero warning at compile time.

This matters more than usual because **the CMS data is already inconsistent.** From the live space:

```json
{ "name": "Dr. Ngozi Nwosu",
  "facultySlug": "dr-ngozi-nwosu",         ← should be "engineering"
  "departmentSlug": "lecturer-power-system" ← should be "electrical-engineering" }

{ "name": "Dr Tunde Hassan ",              ← trailing whitespace
  "facultySlug": "computer science" }      ← space, not hyphen; won't match any faculty slug
```

Two of three staff records have `facultySlug` values that match **no** faculty. The staff filter at `app/staff/page.tsx:39` will silently return nothing for them. A typed boundary with runtime validation would have caught this at the seam.

**Fix:** Zod is already a dependency. Define response schemas and `parse()` at the boundary in `lib/contentful.ts`. You get real types *and* loud failures on bad CMS data, for maybe 40 lines of code. Then set `@typescript-eslint/no-explicit-any` to `error` in CI so it stays fixed.

---

### 15. `getEntries` mapping logic duplicated 6 times verbatim

The news-article mapper is copy-pasted, character for character, at `lib/contentful.ts:478-496`, `513-531`, and `551-569`. The faculty mapper is duplicated at `590-606` and `622-638`. Additionally `getFeaturedFaculties()` and `getAllFaculties()` are **completely identical functions** with different names — same query, same limit of 100, same mapping.

Interestingly, `mapEventEntry()` at line 767 shows the right pattern was understood — events were factored into a shared helper. It just wasn't applied to the other four types.

**Fix:** one mapper per content type. Follow the `mapEventEntry` precedent. This alone removes ~200 lines and cuts the `any` count roughly in half.

---

## 🟡 Moderate

### 16. Scroll listener re-renders the header on every scroll frame, for nothing

`components/layout/Header.tsx:13-17`
```ts
useEffect(() => {
  const onScroll = () => setScrolled(window.scrollY > 20);
  window.addEventListener("scroll", onScroll);
  return () => window.removeEventListener("scroll", onScroll);
}, []);
```

Three issues:
- The listener isn't `{ passive: true }`, so the browser can't optimise scroll handling.
- `setScrolled` fires on every scroll event, not just on the boundary crossing.
- **The state is unused.** Line 50: `scrolled ? "bg-white" : "bg-white"` — both branches are identical. The entire mechanism drives nothing.

**Fix:** either implement the intended effect (`scrolled ? "bg-white shadow-lg" : "bg-transparent"`) or delete the state and effect entirely. If keeping it, add `{ passive: true }` and only call `setScrolled` when the value actually changes.

---

### 17. Desktop dropdown menus are keyboard-inaccessible

`components/layout/Header.tsx:73-90` — the dropdown opens purely via CSS `group-hover`:

```tsx
<div className="group relative">
  <button className="...">{item.label} <ChevronDown /></button>
  <div className="invisible ... group-hover:visible group-hover:opacity-100">
```

The `<button>` is focusable but pressing Enter/Space does nothing — there's no `onClick`, no state. A keyboard user can tab to "Academics" and "Pages" and never reach the five links inside. Screen reader users get no `aria-expanded` or `aria-haspopup`.

For a public university site this is a real accessibility obligation, not a nice-to-have.

**Fix:** back the dropdown with state, toggle on click as well as hover, add `aria-expanded` / `aria-haspopup="true"`, add `group-focus-within:visible`, and close on Escape.

---

### 18. Mobile menu missing standard modal behaviours

`components/layout/MobileMenu.tsx` — the drawer has none of:
- **Focus trap** — Tab moves focus to the page behind the overlay
- **Escape to close** — only the X button and backdrop work
- **Body scroll lock** — the page scrolls underneath the open drawer
- **`role="dialog"` / `aria-modal="true"`** — screen readers don't announce it as a modal
- **Focus restore** — on close, focus is lost rather than returned to the hamburger

Also `MobileMenu.tsx:17` — `if (!isOpen) return null` means the internal `expanded` accordion state resets on every open. Minor, but probably not intended.

**Fix:** these are exactly what a headless dialog primitive gives you for free. Radix Dialog or React Aria. Hand-rolling modal a11y correctly is more work than it looks.

---

### 19. Invalid HTML in `Nav.tsx` — `<ul>` nested directly in `<ul>`

`components/layout/Nav.tsx:7-16`
```tsx
<ul className='flex gap-4'>
  {navLinks.map(({name}) => (
    <ul key={name}>              // ← <ul> is not valid as a direct child of <ul>
      <li>{name}</li>
    </ul>
  ))}
</ul>
```

Only `<li>` may be a direct child of `<ul>`. Also `cursor-pointer` on a non-interactive `<div>` at line 6, and the items aren't links at all — just text.

Currently masked because the file is dead code (#5). Flagged because it should be deleted, not fixed — but the pattern is worth calling out so it doesn't get rewritten the same way.

---

### 20. `cn()` helper doesn't do what its name implies

`lib/utils.ts:3-5`
```ts
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
```

The near-universal convention for `cn()` is `twMerge(clsx(inputs))`, which resolves conflicting Tailwind classes so a `className` prop can override a component default. This version just concatenates.

Concrete consequence — `Button.tsx:50-54` builds `variants[variant]` then appends `className`. Passing `<Button variant="primary" className="bg-blue-600">` produces `"bg-red-700 ... bg-blue-600"`. Which wins is decided by CSS source order, not by the caller's intent. The override silently may or may not work.

**Fix:** add `tailwind-merge` and wrap: `twMerge(clsx(inputs))`.

---

### 21. Broken Tailwind class on the hero — background never applies

`components/home/HeroSection.tsx:13`
```tsx
<section className="relative min-h-[90vh] overflow-hidden bg[#0D0D1A]">
```

`bg[#0D0D1A]` is missing the hyphen — should be `bg-[#0D0D1A]`. Tailwind emits nothing for it, so the hero has no background colour. Invisible today only because a full-bleed image covers the area; it will show as a white flash while the image loads, and as a fully white hero if the image ever fails.

Silent failure like this is exactly what Tailwind's IntelliSense extension catches. Worth having the team install it.

---

### 22. Homepage LCP image uses a raw `<img>`

`components/home/HeroSection.tsx:16-21`
```tsx
<img src="/images/NIIT.webp" alt="NIIT students and campus" className="..." />
```

This is the largest element on the most-visited page — the LCP element. Using `<img>` means: no responsive `srcset`, no `priority` preload hint, no automatic width/height, so it also causes layout shift.

ESLint flags this (`@next/next/no-img-element`) in **6 places**: `HeroSection.tsx:16`, `AboutSnippet.tsx:49`, `WhyChooseUs.tsx:29,36`, `FeaturedFacuulties.tsx:41`, `LatestNewss.tsx:41`.

Notably the rest of the codebase does use `next/image` correctly, with good `sizes` attributes — e.g. `app/news/page.tsx:38`, `app/gallery/page.tsx:26`. So the knowledge is there; these six were just missed.

**Fix:** convert all six. The hero one gets `priority`. Since these warnings are already being ignored, promote `no-img-element` to `error`.

---

### 23. Render-blocking font import instead of `next/font`

`app/globals.css:1`
```css
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Merriweather:wght@700;900&display=swap");
```

A CSS `@import` of a remote stylesheet is render-blocking and can't start until the CSS itself has downloaded — a serial round-trip on the critical path. It also means a third-party request on every page load (a GDPR consideration for an .edu site with EU visitors).

`app/layout.tsx:37-43` adds `<link rel="preconnect">` for the font hosts, which shows the performance cost was noticed — but preconnect only mitigates it. `next/font` eliminates it: fonts are self-hosted at build time, zero external requests, zero layout shift.

Also note 6 Inter weights + 2 Merriweather weights are requested. Worth checking all 8 are actually used.

**Fix:** `next/font/google`, and drop the preconnects afterwards.

---

### 24. Missing App Router special files

No `not-found.tsx`, no `error.tsx`, no `loading.tsx`, no `global-error.tsx` anywhere in `app/`.

- **`notFound()` is called in 5 places** (`app/news/[slug]/page.tsx:25`, `courses/[slug]:24`, `faculties/[faculty]:28`, `faculties/[faculty]/[department]:34`, `academics/[faculty]:101`) — every one of those renders Next's unstyled default 404, with no header, no footer, and no way back to the site.
- No `error.tsx` means any thrown error shows the default error screen. This compounds #2 — it's likely *why* errors are being swallowed.
- No `loading.tsx` on the two SSR routes (`/events`, `/staff`), so there's no streaming fallback while data loads.

**Fix:** add `app/not-found.tsx` and `app/error.tsx` at minimum. Then #2's fix becomes easy: let errors throw.

---

### 25. Footer links to three routes that don't exist

`components/layout/Footer.tsx:156-158`
```tsx
<Link href="/privacy">Privacy Policy</Link>
<Link href="/terms">Terms of Use</Link>
<Link href="/sitemap.xml">Sitemap</Link>
```

None exist. There's no `app/privacy/`, no `app/terms/`, and no `app/sitemap.ts`. Three guaranteed 404s in the footer of every page.

`/sitemap.xml` is the notable one — Next generates it automatically from an `app/sitemap.ts`, which this project should have anyway for a content site with ~25 indexable routes. There's no `robots.ts` either.

**Fix:** add `app/sitemap.ts` and `app/robots.ts` (both are ~15 lines), and either write the legal pages or remove the links.

---

### 26. Search index is fully client-side with no URL state

`app/search/page.tsx:18-40` builds the entire index server-side and ships it in the RSC payload to `SearchClient`. With current data (3 news + 6 courses + 6 departments) that's fine. It scales linearly — at 200 articles this becomes a significant payload on a page most visitors never use.

Separately, `app/search/SearchClient.tsx`:
- Search state lives only in `useState` — no `?q=` URL param. Results can't be shared, bookmarked, or reached via browser back.
- No empty state. Zero results renders "0 results" and then nothing.
- The `<input>` at line 36 has no `aria-label` (it's wrapped in a `<label>` but the label contains no text — just an icon), and the result count at line 44 isn't in an `aria-live` region, so screen readers aren't told results changed.

The debounce at lines 19-22 is correctly implemented, though — clean cleanup, right dependency.

---

## 🔵 Minor

**27. `isContentfulConfigured()` is needlessly async** — `lib/contentful.ts:463`. It just checks two env vars and returns a boolean, but it's `async` and `await`ed at 8 call sites. Make it a plain function, or better a module-level `const`.

**28. `getRequestTimestamp()` is a pointless async wrapper** — `app/events/page.tsx:14-16` wraps `Date.now()` in an async function and awaits it. Just call `Date.now()`.

**29. Array index used as React key** — `HeroSection.tsx:99`, `AboutSnippet.tsx:64`, `WhyChooseUs.tsx:51`. Fine for these static lists, but the data has stable `title`/`value` fields that would be better keys, and index keys are a habit worth not forming.

**30. `Button.tsx` destructure-to-discard is ugly** — line 66 pulls out `_href, _v, _s, _c` purely to exclude them from the spread, generating 4 lint warnings. Cleaner: `const { variant, size, className, children, ...rest } = props` once at the top.

**31. Nineteen unused imports/variables** — including `Image` in `app/page.tsx:1`, `NAV_LINKS` in `Footer.tsx:2`, and `CONTACT, MapPin, Phone, Mail, Clock` in `Header.tsx:3-4` (left behind by the commented-out top bar at `Header.tsx:22-45`). Delete the commented block too — that's what git history is for.

**32. `constants/nav.ts:28`** — the "Pages" dropdown uses `href: "#"`, which is a no-op link. Since the item has `children` and its own href is never rendered, make it optional in the `NavItem` type rather than using a placeholder.

**33. Zod v4 deprecated API** — `ContactForm.tsx:11` uses `z.string().email()`. In Zod 4 (`^4.4.3` here) the top-level `z.email()` is preferred; the chained method is deprecated.

**34. README setup instructions don't match reality** — README line 198 says `cp .env.example .env.local`, but there's no `.env.example` in the repo and the project reads `.env`. A new developer can't follow the setup steps. Add a committed `.env.example` with empty values.

---

## Things done well

Worth saying plainly, because the list above is long and this is real:

- **The rendering-strategy architecture is genuinely good.** Choosing SSG for courses, ISR for news, SSR for events and the staff directory, and CSR for search is the right call in each case, and the README reasoning is sound. This is the hardest part of Next.js to get right and it's right.
- **Next 16 async APIs are handled correctly throughout** — `params` and `searchParams` are properly typed as `Promise<T>` and awaited in all 8 dynamic routes. Easy thing to get wrong; wasn't gotten wrong.
- **`connection()` is used correctly** at `app/events/page.tsx:19` and `app/staff/page.tsx:19` to opt into dynamic rendering. That's a current-Next API used for the right reason.
- **Metadata is thorough** — `lib/metadata.ts` is a clean builder, and per-page OG/Twitter/canonical coverage is better than most projects at this stage.
- **`next/image` usage, where present, is done properly** — correct `sizes` on `app/news/page.tsx:38` and `app/gallery/page.tsx:26`, `priority` on above-the-fold hero images. The six `<img>` tags are an oversight, not a knowledge gap.
- **Server-side filtering in `getAllStaff()`** (`lib/contentful.ts:796-799`) pushes the filter to Contentful rather than over-fetching — with a comment explaining why. Exactly right.
- **UI primitives are well designed** — `Button`, `Badge`, `SectionHeading`, `StepCard` use `Record<Variant, string>` lookup maps rather than conditional class soup, and `Button`'s discriminated union for link-vs-button is a genuinely nice bit of typing.
- **The debounce in `SearchClient`** is textbook — correct cleanup, correct deps, right delay.
- **No secrets committed.** `.env` is properly gitignored, never appears in history, and no credentials are hardcoded. Verified across all 12 commits.
- **`tsc --noEmit` passes with zero errors** under `strict: true`.

---

## Suggested order of work

**Before any deploy:**
1. Delete both `console.log`/top-level-await debug blocks (#1) — 2 minutes
2. Delete the 11 dead files, rename the two typo'd live ones (#5) — 15 minutes
3. Fix the 9 broken image paths, especially `og-image.jpg` (#4)
4. Remove lorem ipsum and "Baobab University" copy; fix "Creator of Underrated Graduated" (#6)
5. Fix `getFacultyImage` discarding real CMS JPEGs (#3)
6. Make CMS errors loud — add `error.tsx` and `not-found.tsx`, stop falling back to mocks in production (#2, #24)

**This sprint:**
7. Zod-validate the Contentful boundary; kill the 43 `any`s (#14)
8. De-duplicate the six copy-pasted mappers (#15)
9. Delete `types/index.ts` (#7)
10. Drop `dynamicParams = false` on CMS routes (#8)
11. Collapse `/home` into `/` (#11)
12. Wire the contact form to something real, or disable it honestly (#10)
13. Sanitise the rich-text HTML (#9)
14. Replace implementation-note copy with real copy (#13)

**Next:**
15. Keyboard and screen-reader support for both menus (#17, #18)
16. `next/font` migration (#23)
17. Convert the six `<img>` tags (#22)
18. `app/sitemap.ts` + `app/robots.ts`, fix footer 404s (#25)

**Process changes that prevent recurrence:**
- Add `npm run lint` and `tsc --noEmit` to CI as **blocking** checks
- Promote `no-explicit-any` and `@next/next/no-img-element` from warning to error
- Add `no-console` (allowing `console.error`)
- Add a CI grep for `lorem ipsum`, `Baobab`, and `TODO`
- Add a check that every `/images/...` string literal resolves to a real file

---

## Talking points for the call

Framing, since a 34-item list can land harder than intended:

1. **Lead with the rendering architecture.** It's the hardest thing here and it's genuinely well done. The correct Next 16 async `params` handling throughout is not a given at this level.

2. **The core theme is "finish the job, then clean up."** Nearly every blocker is an artifact of iterating without deleting the previous attempt. `FeaturedFaculties.tsx` vs `FeaturedFacuulties.tsx` is the perfect example — v1 was left in place and v2 got a typo'd name, and now the typo is load-bearing. The habit to build: when you replace something, delete the thing you replaced, in the same commit.

3. **The `console.log` at module scope is the single most important teaching moment.** Not because a stray log is a big deal, but because of *where* it is — at the bottom of a shared module, with a top-level await, so it runs on every import across the whole app and prints real people's email addresses into the build log. Worth walking through why the location makes a trivial mistake into a serious one.

4. **The mock-data fallback is the most interesting design discussion.** It was written with good intent — keep the site up if the CMS fails. But because the mocks mirror the real content exactly, it converts a loud failure into a silent one. Good prompt for: *what should this system do when its dependency is down, and how would you find out that it happened?*

5. **`any` at the CMS boundary connects directly to the messy live data.** Two of three staff records have `facultySlug` values matching no faculty (`"dr-ngozi-nwosu"`, `"computer science"`). That filter silently returns nothing for them and nobody would know. Zod is already installed. This is the highest-leverage single change in the codebase.

6. **Accessibility is a requirement, not polish, for a public university site.** A keyboard user cannot reach the Academics dropdown links at all. Concrete, demonstrable, and fixable — good place to introduce a headless primitive library rather than hand-rolling.
