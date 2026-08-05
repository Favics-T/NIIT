import { createClient } from "contentful";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import type { NewsArticle } from "@/types/news";
import type { Faculty } from "@/types/faculty";
import type { UniversityEvent } from "@/types/event";
import type { Leader } from "@/types/leader";
import type { Course, Department } from "@/types/academic";
import type { GalleryImage } from "@/types/gallery";
import type { StaffMember } from "@/types/staff";

type ContentfulAsset = {
  fields?: {
    file?: {
      url?: string;
    };
  };
};

type ContentfulEntry<TFields extends Record<string, unknown>> = {
  sys: {
    id: string;
  };
  fields: TFields;
};

export const contentfulClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

function isContentfulConfigured(): boolean {
  return Boolean(process.env.CONTENTFUL_SPACE_ID && process.env.CONTENTFUL_ACCESS_TOKEN);
}

function assertContentfulConfigured(): void {
  if (!isContentfulConfigured()) {
    throw new Error("Contentful is not configured");
  }
}

function isBuildPhase(): boolean {
  return process.env.NEXT_PHASE === "phase-production-build";
}

function isContentfulNetworkError(error: unknown): boolean {
  if (typeof error !== "object" || error === null) return false;
  const code = "code" in error ? (error as { code?: string }).code : undefined;
  return code === "ENOTFOUND" || code === "EAI_AGAIN" || code === "ECONNREFUSED" || code === "EACCES";
}

function handleContentfulError<T>(scope: string, error: unknown, fallback: T): T {
  console.error(`Error fetching ${scope} from Contentful:`, error);
  if (isBuildPhase() || isContentfulNetworkError(error)) {
    return fallback;
  }
  throw error;
}

function getAssetUrl(asset: unknown, fallback = ""): string {
  const url = (asset as ContentfulAsset | null | undefined)?.fields?.file?.url;
  return url ? `https:${url}` : fallback;
}

function mapNewsEntry(item: ContentfulEntry<Record<string, unknown>>): NewsArticle {
  return {
    id: item.sys.id,
    slug: (item.fields.slug as string) ?? "",
    title: (item.fields.title as string) ?? "",
    excerpt: (item.fields.excerpt as string) ?? "",
    body:
      item.fields.body && typeof item.fields.body === "object" && "nodeType" in item.fields.body
        ? documentToHtmlString(item.fields.body as never)
        : "",
    category: (item.fields.category as string) ?? "",
    coverImage: getAssetUrl(item.fields.coverImage, "/images/news-placeholder.jpg"),
    author: (item.fields.author as string) ?? "",
    authorAvatar: getAssetUrl(item.fields.authorAvatar, "/images/avatar-placeholder.jpg"),
    publishedAt: (item.fields.publishedAt as string) ?? new Date().toISOString(),
    tags: Array.isArray(item.fields.tags) ? (item.fields.tags as string[]) : [],
  };
}

function mapFacultyEntry(item: ContentfulEntry<Record<string, unknown>>): Faculty {
  return {
    id: item.sys.id,
    slug: (item.fields.slug as string) ?? "",
    name: (item.fields.name as string) ?? "",
    shortName: (item.fields.shortName as string) ?? "",
    description: (item.fields.description as string) ?? "",
    coverImage: getAssetUrl(item.fields.coverImage),
    icon: (item.fields.icon as string) ?? "",
    programCount: (item.fields.programCount as number) ?? 0,
    studentCount: (item.fields.studentCount as number) ?? 0,
    dean: (item.fields.dean as string) ?? "",
    featuredPrograms: Array.isArray(item.fields.featuredPrograms)
      ? (item.fields.featuredPrograms as string[])
      : [],
  };
}

function mapDepartmentEntry(item: ContentfulEntry<Record<string, unknown>>): Department {
  return {
    id: item.sys.id,
    slug: (item.fields.slug as string) ?? "",
    facultySlug: (item.fields.facultySlug as string) ?? "",
    name: (item.fields.name as string) ?? "",
    overview: (item.fields.overview as string) ?? "",
    head: (item.fields.head as string) ?? "",
    courseSlugs: Array.isArray(item.fields.courseSlugs) ? (item.fields.courseSlugs as string[]) : [],
  };
}

function mapCourseEntry(item: ContentfulEntry<Record<string, unknown>>): Course {
  return {
    id: item.sys.id,
    slug: (item.fields.slug as string) ?? "",
    departmentSlug: (item.fields.departmentSlug as string) ?? "",
    facultySlug: (item.fields.facultySlug as string) ?? "",
    title: (item.fields.title as string) ?? "",
    summary: (item.fields.summary as string) ?? "",
    duration: (item.fields.duration as string) ?? "",
    degree: (item.fields.degree as string) ?? "",
    requirements: Array.isArray(item.fields.requirements) ? (item.fields.requirements as string[]) : [],
    careerPaths: Array.isArray(item.fields.careerPaths) ? (item.fields.careerPaths as string[]) : [],
  };
}

function mapEventEntry(item: ContentfulEntry<Record<string, unknown>>): UniversityEvent {
  return {
    id: item.sys.id,
    slug: (item.fields.slug as string) ?? "",
    title: (item.fields.title as string) ?? "",
    description: (item.fields.description as string) ?? "",
    coverImage: getAssetUrl(item.fields.coverImage, "/images/event-placeholder.jpg"),
    location: (item.fields.location as string) ?? "",
    startDate: (item.fields.startDate as string) ?? "",
    endDate: (item.fields.endDate as string) ?? "",
    category: (item.fields.category as string) ?? "",
    isFeatured: Boolean(item.fields.isFeatured),
    registrationLink: item.fields.registrationLink ? (item.fields.registrationLink as string) : undefined,
  };
}

function mapLeaderEntry(item: ContentfulEntry<Record<string, unknown>>): Leader {
  return {
    id: item.sys.id,
    name: (item.fields.name as string) ?? "",
    title: (item.fields.title as string) ?? "",
    role: (item.fields.role as Leader["role"]) ?? "director",
    faculty: item.fields.faculty ? (item.fields.faculty as string) : undefined,
    bio: (item.fields.bio as string) ?? "",
    photo: getAssetUrl(item.fields.photo, "/images/leader-placeholder.jpg"),
    email: item.fields.email ? (item.fields.email as string) : undefined,
    qualifications: Array.isArray(item.fields.qualifications)
      ? (item.fields.qualifications as string[])
      : [],
  };
}

function mapGalleryEntry(item: ContentfulEntry<Record<string, unknown>>): GalleryImage {
  return {
    id: item.sys.id,
    title: (item.fields.title as string) ?? "",
    category: (item.fields.category as GalleryImage["category"]) ?? "Campus",
    image: getAssetUrl(item.fields.image, "/images/NIIT.webp"),
    alt: (item.fields.alt as string) ?? "",
  };
}

function mapStaffEntry(item: ContentfulEntry<Record<string, unknown>>): StaffMember {
  return {
    id: item.sys.id,
    name: (item.fields.name as string) ?? "",
    title: (item.fields.title as string) ?? "",
    facultySlug: (item.fields.facultySlug as string) ?? "",
    departmentSlug: (item.fields.departmentSlug as string) ?? "",
    email: (item.fields.email as string) ?? "",
    expertise: Array.isArray(item.fields.expertise) ? (item.fields.expertise as string[]) : [],
    profileImage: getAssetUrl(item.fields.profileImage, "/images/staff-placeholder.jpg"),
  };
}

async function fetchEntries<TFields extends Record<string, unknown>>(
  contentType: string,
  query: Record<string, unknown> = {}
): Promise<Array<ContentfulEntry<TFields>>> {
  assertContentfulConfigured();
  const entries = await contentfulClient.getEntries({
    content_type: contentType,
    ...query,
  });
  return entries.items as unknown as Array<ContentfulEntry<TFields>>;
}

export async function getLatestNews(limit = 3): Promise<NewsArticle[]> {
  try {
    const items = await fetchEntries("newsArticle", {
      limit,
      order: ["-fields.publishedAt"],
    });
    return items.map(mapNewsEntry);
  } catch (error) {
    return handleContentfulError("latest news", error, []);
  }
}

export async function getAllNews(): Promise<NewsArticle[]> {
  try {
    const items = await fetchEntries("newsArticle", {
      limit: 1000,
      order: ["-fields.publishedAt"],
    });
    return items.map(mapNewsEntry);
  } catch (error) {
    return handleContentfulError("all news", error, []);
  }
}

export async function getNewsArticle(slug: string): Promise<NewsArticle | null> {
  try {
    const items = await fetchEntries("newsArticle", {
      "fields.slug": slug,
      limit: 1,
    });
    if (items.length === 0) return null;
    return mapNewsEntry(items[0]);
  } catch (error) {
    return handleContentfulError("news article", error, null);
  }
}

export async function getAllNewsSlugs(): Promise<string[]> {
  const news = await getAllNews();
  return news.map((n) => n.slug);
}

export async function getFeaturedFaculties(): Promise<Faculty[]> {
  try {
    const items = await fetchEntries("faculty", { limit: 100 });
    return items.map(mapFacultyEntry);
  } catch (error) {
    return handleContentfulError("faculties", error, []);
  }
}

export async function getAllFaculties(): Promise<Faculty[]> {
  return getFeaturedFaculties();
}

export async function getFaculty(slug: string): Promise<Faculty | null> {
  try {
    const items = await fetchEntries("faculty", {
      "fields.slug": slug,
      limit: 1,
    });
    if (items.length === 0) return null;
    return mapFacultyEntry(items[0]);
  } catch (error) {
    return handleContentfulError("faculty", error, null);
  }
}

export async function getAllFacultySlugs(): Promise<string[]> {
  const faculties = await getAllFaculties();
  return faculties.map((f) => f.slug);
}

export async function getDepartmentsByFaculty(facultySlug: string): Promise<Department[]> {
  try {
    const items = await fetchEntries("department", {
      "fields.facultySlug": facultySlug,
      limit: 1000,
    });
    return items.map(mapDepartmentEntry);
  } catch (error) {
    return handleContentfulError("departments", error, []);
  }
}

export async function getAllDepartments(): Promise<Department[]> {
  try {
    const items = await fetchEntries("department", { limit: 1000 });
    return items.map(mapDepartmentEntry);
  } catch (error) {
    return handleContentfulError("all departments", error, []);
  }
}

export async function getDepartment(
  facultySlug: string,
  departmentSlug: string
): Promise<Department | null> {
  try {
    const items = await fetchEntries("department", {
      "fields.facultySlug": facultySlug,
      "fields.slug": departmentSlug,
      limit: 1,
    });
    if (items.length === 0) return null;
    return mapDepartmentEntry(items[0]);
  } catch (error) {
    return handleContentfulError("department", error, null);
  }
}

export async function getAllDepartmentParams(): Promise<{ faculty: string; department: string }[]> {
  const departments = await getAllDepartments();
  return departments.map((department) => ({
    faculty: department.facultySlug,
    department: department.slug,
  }));
}

export async function getCoursesByDepartment(departmentSlug: string): Promise<Course[]> {
  try {
    const items = await fetchEntries("course", {
      "fields.departmentSlug": departmentSlug,
      limit: 1000,
    });
    return items.map(mapCourseEntry);
  } catch (error) {
    return handleContentfulError("courses", error, []);
  }
}

export async function getAllCourses(): Promise<Course[]> {
  try {
    const items = await fetchEntries("course", { limit: 1000 });
    return items.map(mapCourseEntry);
  } catch (error) {
    return handleContentfulError("all courses", error, []);
  }
}

export async function getCourse(slug: string): Promise<Course | null> {
  try {
    const items = await fetchEntries("course", {
      "fields.slug": slug,
      limit: 1,
    });
    if (items.length === 0) return null;
    return mapCourseEntry(items[0]);
  } catch (error) {
    return handleContentfulError("course", error, null);
  }
}

export async function getAllCourseSlugs(): Promise<string[]> {
  const courses = await getAllCourses();
  return courses.map((course) => course.slug);
}

export async function getUpcomingEvents(limit = 3): Promise<UniversityEvent[]> {
  try {
    const items = await fetchEntries("universityEvent", {
      limit,
      order: ["fields.startDate"],
    });
    return items.map(mapEventEntry);
  } catch (error) {
    return handleContentfulError("upcoming events", error, []);
  }
}

export async function getAllEvents(): Promise<UniversityEvent[]> {
  try {
    const items = await fetchEntries("universityEvent", {
      limit: 1000,
      order: ["fields.startDate"],
    });
    return items.map(mapEventEntry);
  } catch (error) {
    return handleContentfulError("all events", error, []);
  }
}

export async function getAllStaff(filters?: { faculty?: string; department?: string }): Promise<StaffMember[]> {
  try {
    const query: Record<string, unknown> = {
      content_type: "staff",
      limit: 1000,
    };

    if (filters?.faculty) query["fields.facultySlug"] = filters.faculty;
    if (filters?.department) query["fields.departmentSlug"] = filters.department;

    assertContentfulConfigured();
    const entries = await contentfulClient.getEntries(query);
    return (entries.items as Array<ContentfulEntry<Record<string, unknown>>>).map(mapStaffEntry);
  } catch (error) {
    return handleContentfulError("staff", error, []);
  }
}

export async function getGalleryImages(): Promise<GalleryImage[]> {
  try {
    const items = await fetchEntries("galleryImage", { limit: 1000 });
    return items.map(mapGalleryEntry);
  } catch (error) {
    return handleContentfulError("gallery images", error, []);
  }
}

export async function getAllLeaders(): Promise<Leader[]> {
  try {
    const items = await fetchEntries("leader", { limit: 1000 });
    return items.map(mapLeaderEntry);
  } catch (error) {
    return handleContentfulError("leaders", error, []);
  }
}

export async function getVC(): Promise<Leader | null> {
  const leaders = await getAllLeaders();
  return leaders.find((leader) => leader.role === "vc") ?? null;
}
