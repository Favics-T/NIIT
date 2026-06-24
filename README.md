#  School Website — Next.js Rendering Architecture

A university/school website built with **Next.js App Router**, **TypeScript**, **Tailwind CSS**, and **Contentful CMS**. The core architectural focus of this project is demonstrating all four Next.js rendering strategies — **ISR, SSG, SSR, and CSR** — applied to the right pages for the right reasons.

---

## Project Stack

| Tool | Purpose |
|---|---|
| Next.js (App Router) | Framework |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| Contentful | Headless CMS |
| Vercel | Deployment |
| React Hook Form + Zod | Form handling & validation |

---

##  Rendering Strategy Architecture

This project deliberately applies a different rendering strategy to each page based on how frequently the content changes and how the page is used. Below is a full breakdown.

---

###  ISR — Incremental Static Regeneration
> *Built once at deploy time, silently rebuilt in the background on a timer*

**Pages:** Home (`/`)

**How it works:**

```ts
// page.tsx
export const revalidate = 3600; // rebuild every 1 hour

const data = await fetch('https://...contentful.com/news', {
  next: { revalidate: 3600 }
});
```

**Why ISR here:**
The home page displays news, upcoming events, and featured faculties — content that changes regularly (daily or weekly) but not in real time. ISR gives us static-level performance (fast load, CDN-cacheable) while ensuring content refreshes automatically every hour without a full redeploy.

**Tradeoffs accepted:**
- Content can be up to 1 hour stale acceptable for news previews
- No server computation per request performance win
- SEO-friendly — page is fully pre-rendered HTML 

---

###  SSG — Static Site Generation
> *Built once at deploy time, never changes until you redeploy*

**Pages:** About (`/about`), Academics (`/academics`), Academics detail (`/academics/[slug]`)

**How it works:**

```ts
// Single page — no special config needed
// Any fetch without cache:'no-store' or revalidate = SSG by default
const data = await fetch('https://...contentful.com/about');

// Dynamic routes — pre-build all slugs
export async function generateStaticParams() {
  const departments = await getDepartments();
  return departments.map((dept) => ({ slug: dept.slug }));
}
```

**Why SSG here:**
The About page and Academics pages contain institutional content — school history, mission, department descriptions — that changes only when deliberately updated. Pure SSG produces the fastest possible pages with zero runtime cost. A redeploy is the correct trigger for these updates.

**Tradeoffs accepted:**
- Requires redeploy to update  acceptable, changes are intentional
- Fastest possible TTFB 
- Best SEO — fully static HTML 

---

###  SSR — Server-Side Rendering
> *Generated fresh on the server for every single request*

**Pages:** Events (`/events`)

**How it works:**

```ts
// cache: 'no-store' opts this page out of all caching
const data = await fetch('https://...contentful.com/events', {
  cache: 'no-store'
});
```

**Why SSR here:**
Events are time-sensitive. A cancelled event, a rescheduled date, or a venue change must be reflected immediately — showing stale event data could actively mislead users. Unlike news (where hour-old data is fine), event accuracy is critical. SSR also supports future URL-based filtering via `searchParams` (e.g. `/events?month=july`) which static rendering cannot accommodate.

**Tradeoffs accepted:**
- Slower than static — server fetch on every visit justified by freshness requirement
- Higher server load acceptable for a page with moderate traffic
- Still SEO-friendly — HTML is fully rendered server-side 

---

### CSR — Client-Side Rendering
> *Empty shell delivered, data fetched in the browser after load*

**Pages:** Search (`/search`), Contact (`/contact`)

**How it works:**

```ts
'use client';

// Search — debounced client-side fetch
const debouncedQuery = useDebounce(query, 400);

useEffect(() => {
  if (!debouncedQuery) return;
  fetch(`/api/search?q=${debouncedQuery}`)
    .then(res => res.json())
    .then(setResults);
}, [debouncedQuery]);

// Contact — React Hook Form + Zod validation
const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});
```

**Why CSR here:**
Both pages are driven entirely by user interaction — there is no meaningful data to pre-render. Search results depend on a query that doesn't exist until the user types it. The contact form validates and submits data in real time. Neither page needs SEO indexing, so the tradeoff of an empty initial HTML shell costs nothing.

**Tradeoffs accepted:**
- No SEO indexing acceptable — search and contact don't need it
- Requires JavaScript standard for interactive pages
- Debounce on search reduces API calls from every keystroke to once per pause 

---

##  Page — Strategy Map

| Page | Route | Strategy | Reason |
|---|---|---|---|
| Home | `/` | ISR (1hr) | Semi-dynamic content, SEO important |
| About | `/about` | SSG | Rarely changes, fastest load |
| Academics | `/academics` | SSG | Stable institutional content |
| Academics Detail | `/academics/[slug]` | SSG + `generateStaticParams` | Pre-built per department |
| Blog Listing | `/blog` | ISR | New posts added regularly |
| Blog Detail | `/blog/[slug]` | ISR + `generateStaticParams` | Content updates occasionally |
| Events | `/events` | SSR | Time-sensitive, must be current |
| Gallery | `/gallery` | SSG | Static media, rarely changes |
| Search | `/search` | CSR | Query-driven, no pre-render possible |
| Contact | `/contact` | CSR | Form interaction, no data to pre-render |

---

##  Project Structure

```
src/
├── app/
│   ├── page.tsx              # Home — ISR
│   ├── about/
│   │   └── page.tsx          # About — SSG
│   ├── academics/
│   │   ├── page.tsx          # Academics listing — SSG
│   │   └── [slug]/
│   │       └── page.tsx      # Department detail — SSG
│   ├── events/
│   │   └── page.tsx          # Events — SSR
│   ├── search/
│   │   └── page.tsx          # Search — CSR
│   └── contact/
│       └── page.tsx          # Contact — CSR
├── components/
│   └── home/
│       ├── HeroSection.tsx
│       ├── LatestNews.tsx
│       ├── UpcomingEvents.tsx
│       └── ...
└── lib/
    ├── contentful.ts         # Contentful data fetching
    └── metadata.ts           # SEO metadata helpers
```

---

##  Getting Started

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your Contentful Space ID and Access Token

# Run development server
npm run dev

# Build for production (triggers SSG + ISR pre-rendering)
npm run build
```

---

##  Deployment

Deployed on **Vercel**. ISR revalidation, SSR edge functions, and static file serving are all handled automatically by Vercel's Next.js integration.

---

##  Author

Built as an internship graded project demonstrating Next.js rendering strategy architecture.