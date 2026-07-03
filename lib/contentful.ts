/**
 * Contentful CMS data layer.
 *
 * To connect a real Contentful space set these env vars:
 *   CONTENTFUL_SPACE_ID
 *   CONTENTFUL_ACCESS_TOKEN
 *   CONTENTFUL_PREVIEW_TOKEN  (optional, for draft previews)
 *
 * When those variables are absent the module falls back to local mock data
 * so the project builds and runs without a Contentful account.
 */

import { createClient } from "contentful";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import type { NewsArticle } from "@/types/news";
import type { Faculty } from "@/types/faculty";
import type { UniversityEvent } from "@/types/event";
import type { Leader } from "@/types/leader";
import type { Course, Department } from "@/types/academic";
import type { GalleryImage } from "@/types/gallery";
import type { StaffMember } from "@/types/staff";


export const contentfulClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

// ---------------------------------------------------------------------------
// Mock data (used when CONTENTFUL_SPACE_ID is not set)
// ---------------------------------------------------------------------------

const MOCK_NEWS: NewsArticle[] = [
  {
    id: "1",
    slug: "niit-wins-best-university-award-2025",
    title: "NIIT Wins Best University Award 2025",
    excerpt:
      "The National Institute and Information Technology has been honoured with the prestigious Best University Award at the 2025 National Education Summit.",
    body: "<p>Full article content goes here...</p>",
    category: "Awards",
    coverImage: "/images/news-placeholder.jpg",
    author: "Dr. Amina Bello",
    authorAvatar: "/images/avatar-placeholder.jpg",
    publishedAt: "2025-11-15T09:00:00Z",
    tags: ["award", "excellence", "education"],
  },
  {
    id: "2",
    slug: "new-engineering-lab-opens",
    title: "State-of-the-Art Engineering Lab Opens on Campus",
    excerpt:
      "A N500 million engineering and innovation laboratory has officially opened, equipped with robotics, 3D printing, and AI workstations.",
    body: "<p>Full article content goes here...</p>",
    category: "Campus",
    coverImage: "/images/news-placeholder.jpg",
    author: "Prof. Chukwuemeka Obi",
    authorAvatar: "/images/avatar-placeholder.jpg",
    publishedAt: "2025-10-28T10:30:00Z",
    tags: ["campus", "engineering", "technology"],
  },
  {
    id: "3",
    slug: "scholarship-applications-2026",
    title: "Applications Open for 2026 NIIT Scholarship Programme",
    excerpt:
      "The NIIT Scholarship Board invites applications from outstanding students across Nigeria for full and partial academic scholarships.",
    body: "<p>Full article content goes here...</p>",
    category: "Scholarships",
    coverImage: "/images/news-placeholder.jpg",
    author: "Mrs. Fatima Usman",
    authorAvatar: "/images/avatar-placeholder.jpg",
    publishedAt: "2025-10-10T08:00:00Z",
    tags: ["scholarship", "students", "funding"],
  },
];

const MOCK_FACULTIES: Faculty[] = [
  {
    id: "1",
    slug: "engineering",
    name: "Faculty of Engineering",
    shortName: "Engineering",
    description:
      "Pioneering world-class engineers through rigorous academics, practical labs, and industry partnerships.",
    coverImage: "/images/Class1.png",
    icon: "Cpu",
    programCount: 8,
    studentCount: 3200,
    dean: "Prof. Afolabi Martins",
    featuredPrograms: ["Mechanical Engineering", "Electrical Engineering", "Civil Engineering"],
  },
  {
    id: "2",
    slug: "computer-science",
    name: "Faculty of Computer Science",
    shortName: "Computer Science",
    description:
      "Training the next generation of software engineers, data scientists, and cybersecurity experts.",
    coverImage: "/images/Class2.png",
    icon: "Monitor",
    programCount: 6,
    studentCount: 4100,
    dean: "Prof. Ngozi Eze",
    featuredPrograms: ["Computer Science", "Cybersecurity", "Data Science"],
  },
  {
    id: "3",
    slug: "business-administration",
    name: "Faculty of Business Administration",
    shortName: "Business",
    description:
      "Developing entrepreneurial leaders equipped with global business acumen and ethical decision-making skills.",
    coverImage: "/images/Class1.png",
    icon: "Briefcase",
    programCount: 5,
    studentCount: 2800,
    dean: "Dr. Kemi Adeyemi",
    featuredPrograms: ["Business Administration", "Accounting", "Marketing"],
  },
  {
    id: "4",
    slug: "information-technology",
    name: "Faculty of Information Technology",
    shortName: "IT",
    description:
      "Bridging the digital divide through cutting-edge IT education, research and community-focused innovation.",
    coverImage: "/images/Class1.jpg",
    icon: "Globe",
    programCount: 4,
    studentCount: 2100,
    dean: "Dr. Bayo Akande",
    featuredPrograms: ["Information Technology", "Network Engineering", "Software Engineering"],
  },
];

const MOCK_EVENTS: UniversityEvent[] = [
  {
    id: "1",
    slug: "convocation-ceremony-2025",
    title: "2025 Convocation Ceremony",
    description:
      "Annual convocation ceremony for the graduating class of 2025. Families, friends and well-wishers are welcome.",
    coverImage: "/images/event-placeholder.jpg",
    location: "NIIT Main Auditorium",
    startDate: "2026-01-20T10:00:00Z",
    endDate: "2026-01-20T16:00:00Z",
    category: "Ceremony",
    isFeatured: true,
    registrationLink: "/admissions",
  },
  {
    id: "2",
    slug: "stem-innovation-summit",
    title: "STEM Innovation Summit",
    description:
      "A two-day summit bringing together students, researchers, and industry leaders to showcase technological innovations.",
    coverImage: "/images/event-placeholder.jpg",
    location: "Engineering Complex Hall A",
    startDate: "2026-02-05T09:00:00Z",
    endDate: "2026-02-06T17:00:00Z",
    category: "Conference",
    isFeatured: false,
    registrationLink: "/contact",
  },
  {
    id: "3",
    slug: "open-day-2026",
    title: "Open Day — Explore NIIT",
    description:
      "Prospective students and parents are invited to tour the campus, meet faculty, and learn about admission requirements.",
    coverImage: "/images/event-placeholder.jpg",
    location: "NIIT Campus (All Zones)",
    startDate: "2026-02-15T08:00:00Z",
    endDate: "2026-02-15T15:00:00Z",
    category: "Open Day",
    isFeatured: true,
    registrationLink: "/admissions",
  },
];

const MOCK_LEADERS: Leader[] = [
  {
    id: "1",
    name: "Prof. Adebayo Okonkwo",
    title: "Vice Chancellor",
    role: "vc",
    bio: "Professor Okonkwo brings over 30 years of academic and administrative leadership to NIIT, having previously served as Dean of Engineering at multiple prestigious institutions.",
    photo: "/images/leader-placeholder.jpg",
    email: "vc@niit.edu.ng",
    qualifications: ["PhD, Electrical Engineering, MIT", "MSc, University of Lagos", "BSc, University of Ibadan"],
  },
  {
    id: "2",
    name: "Prof. Afolabi Martins",
    title: "Dean, Faculty of Engineering",
    role: "dean",
    faculty: "Engineering",
    bio: "A renowned mechanical engineer whose research spans renewable energy and advanced materials science.",
    photo: "/images/leader-placeholder.jpg",
    qualifications: ["PhD, Mechanical Engineering, Cambridge", "BEng, UNILAG"],
  },
  {
    id: "3",
    name: "Prof. Ngozi Eze",
    title: "Dean, Faculty of Computer Science",
    role: "dean",
    faculty: "Computer Science",
    bio: "A pioneer in artificial intelligence and machine learning research in Nigeria with over 120 published papers.",
    photo: "/images/leader-placeholder.jpg",
    qualifications: ["PhD, Computer Science, Stanford", "MSc, University of Ghana"],
  },
  {
    id: "4",
    name: "Dr. Kemi Adeyemi",
    title: "Dean, Faculty of Business Administration",
    role: "dean",
    faculty: "Business Administration",
    bio: "Former Chief Finance Officer at a Fortune 500 company, Dr. Adeyemi now leads business education with real-world impact.",
    photo: "/images/leader-placeholder.jpg",
    qualifications: ["PhD, Business Administration, Harvard", "MBA, London Business School"],
  },
];

const MOCK_DEPARTMENTS: Department[] = [
  {
    id: "dept-1",
    slug: "mechanical-engineering",
    facultySlug: "engineering",
    name: "Department of Mechanical Engineering",
    overview:
      "Designing engineers with strong foundations in mechanics, materials, manufacturing, and sustainable systems.",
    head: "Dr. Ibrahim Salako",
    courseSlugs: ["mechanical-engineering", "mechatronics-engineering"],
  },
  {
    id: "dept-2",
    slug: "electrical-engineering",
    facultySlug: "engineering",
    name: "Department of Electrical Engineering",
    overview:
      "Preparing students for power systems, electronics, embedded systems, and industrial automation.",
    head: "Dr. Ada Nwosu",
    courseSlugs: ["electrical-engineering", "renewable-energy-systems"],
  },
  {
    id: "dept-3",
    slug: "software-systems",
    facultySlug: "computer-science",
    name: "Department of Software Systems",
    overview:
      "A project-led department focused on software engineering, web platforms, cloud systems, and product delivery.",
    head: "Dr. Tunde Hassan",
    courseSlugs: ["computer-science", "software-engineering"],
  },
  {
    id: "dept-4",
    slug: "data-cybersecurity",
    facultySlug: "computer-science",
    name: "Department of Data and Cybersecurity",
    overview:
      "Training analysts and security professionals in data science, machine learning, digital forensics, and secure systems.",
    head: "Dr. Miriam Okafor",
    courseSlugs: ["data-science", "cybersecurity"],
  },
  {
    id: "dept-5",
    slug: "management-studies",
    facultySlug: "business-administration",
    name: "Department of Management Studies",
    overview:
      "Developing business leaders through applied management, accounting, marketing, and entrepreneurship.",
    head: "Dr. Segun Alabi",
    courseSlugs: ["business-administration", "accounting", "marketing"],
  },
  {
    id: "dept-6",
    slug: "network-digital-systems",
    facultySlug: "information-technology",
    name: "Department of Network and Digital Systems",
    overview:
      "Focused on network engineering, IT operations, software platforms, and enterprise digital infrastructure.",
    head: "Mrs. Laila Abdullahi",
    courseSlugs: ["information-technology", "network-engineering"],
  },
];

const MOCK_COURSES: Course[] = [
  {
    id: "course-1",
    slug: "mechanical-engineering",
    departmentSlug: "mechanical-engineering",
    facultySlug: "engineering",
    title: "B.Eng. Mechanical Engineering",
    summary:
      "A broad engineering programme covering thermodynamics, machine design, manufacturing, and energy systems.",
    duration: "5 years",
    degree: "Bachelor of Engineering",
    requirements: ["Mathematics", "English Language", "Physics", "Chemistry"],
    careerPaths: ["Mechanical Engineer", "Manufacturing Engineer", "Energy Systems Analyst"],
  },
  {
    id: "course-2",
    slug: "electrical-engineering",
    departmentSlug: "electrical-engineering",
    facultySlug: "engineering",
    title: "B.Eng. Electrical Engineering",
    summary:
      "Power, electronics, control systems, and embedded engineering for industrial and infrastructure careers.",
    duration: "5 years",
    degree: "Bachelor of Engineering",
    requirements: ["Mathematics", "English Language", "Physics", "Further Mathematics"],
    careerPaths: ["Power Engineer", "Electronics Engineer", "Automation Specialist"],
  },
  {
    id: "course-3",
    slug: "computer-science",
    departmentSlug: "software-systems",
    facultySlug: "computer-science",
    title: "BSc Computer Science",
    summary:
      "Computer systems, algorithms, databases, distributed applications, and software product development.",
    duration: "4 years",
    degree: "Bachelor of Science",
    requirements: ["Mathematics", "English Language", "Physics", "Computer Studies"],
    careerPaths: ["Software Developer", "Systems Analyst", "Cloud Engineer"],
  },
  {
    id: "course-4",
    slug: "cybersecurity",
    departmentSlug: "data-cybersecurity",
    facultySlug: "computer-science",
    title: "BSc Cybersecurity",
    summary:
      "Secure systems, network defence, digital forensics, ethical hacking, and risk management.",
    duration: "4 years",
    degree: "Bachelor of Science",
    requirements: ["Mathematics", "English Language", "Physics", "Computer Studies"],
    careerPaths: ["Security Analyst", "Digital Forensics Officer", "Network Security Engineer"],
  },
  {
    id: "course-5",
    slug: "business-administration",
    departmentSlug: "management-studies",
    facultySlug: "business-administration",
    title: "BSc Business Administration",
    summary:
      "Management, operations, entrepreneurship, finance, and leadership for modern organisations.",
    duration: "4 years",
    degree: "Bachelor of Science",
    requirements: ["Mathematics", "English Language", "Economics", "Commerce"],
    careerPaths: ["Business Analyst", "Operations Manager", "Entrepreneur"],
  },
  {
    id: "course-6",
    slug: "information-technology",
    departmentSlug: "network-digital-systems",
    facultySlug: "information-technology",
    title: "BSc Information Technology",
    summary:
      "Enterprise systems, networking, software tools, IT service delivery, and digital transformation.",
    duration: "4 years",
    degree: "Bachelor of Science",
    requirements: ["Mathematics", "English Language", "Physics", "Computer Studies"],
    careerPaths: ["IT Consultant", "Systems Administrator", "Digital Transformation Analyst"],
  },
];

const MOCK_STAFF: StaffMember[] = [
  {
    id: "staff-1",
    name: "Dr. Ibrahim Salako",
    title: "Senior Lecturer, Mechanical Systems",
    facultySlug: "engineering",
    departmentSlug: "mechanical-engineering",
    email: "i.salako@niit.edu.ng",
    expertise: ["Machine Design", "Manufacturing", "Materials"],
    profileImage: "/images/NIIT.webp",
  },
  {
    id: "staff-2",
    name: "Dr. Ada Nwosu",
    title: "Lecturer, Power Systems",
    facultySlug: "engineering",
    departmentSlug: "electrical-engineering",
    email: "a.nwosu@niit.edu.ng",
    expertise: ["Power Systems", "Control", "Electronics"],
    profileImage: "/images/Class1.png",
  },
  {
    id: "staff-3",
    name: "Dr. Tunde Hassan",
    title: "Senior Lecturer, Software Engineering",
    facultySlug: "computer-science",
    departmentSlug: "software-systems",
    email: "t.hassan@niit.edu.ng",
    expertise: ["Web Platforms", "Cloud", "Software Architecture"],
    profileImage: "/images/Class2.png",
  },
  {
    id: "staff-4",
    name: "Dr. Miriam Okafor",
    title: "Lecturer, Cybersecurity",
    facultySlug: "computer-science",
    departmentSlug: "data-cybersecurity",
    email: "m.okafor@niit.edu.ng",
    expertise: ["Security Operations", "Forensics", "Data Science"],
    profileImage: "/images/NIIT.webp",
  },
  {
    id: "staff-5",
    name: "Dr. Segun Alabi",
    title: "Lecturer, Management Studies",
    facultySlug: "business-administration",
    departmentSlug: "management-studies",
    email: "s.alabi@niit.edu.ng",
    expertise: ["Strategy", "Accounting", "Entrepreneurship"],
    profileImage: "/images/Class1.png",
  },
  {
    id: "staff-6",
    name: "Mrs. Laila Abdullahi",
    title: "Lecturer, Network Engineering",
    facultySlug: "information-technology",
    departmentSlug: "network-digital-systems",
    email: "l.abdullahi@niit.edu.ng",
    expertise: ["Networks", "IT Operations", "Infrastructure"],
    profileImage: "/images/Class2.png",
  },
];

const MOCK_GALLERY: GalleryImage[] = [
  {
    id: "gallery-1",
    title: "Main learning block",
    category: "Campus",
    image: "/images/NIIT.webp",
    alt: "NIIT campus learning block",
  },
  {
    id: "gallery-2",
    title: "Technology classroom",
    category: "Labs",
    image: "/images/Class1.png",
    alt: "Students in a technology classroom",
  },
  {
    id: "gallery-3",
    title: "Collaborative lab session",
    category: "Labs",
    image: "/images/Class2.png",
    alt: "Students collaborating in a lab session",
  },
  {
    id: "gallery-4",
    title: "Student presentation",
    category: "Student Life",
    image: "/images/MD.png",
    alt: "Student presentation on campus",
  },
  {
    id: "gallery-5",
    title: "Open day experience",
    category: "Events",
    image: "/images/NIIT.webp",
    alt: "Open day guests at NIIT",
  },
  {
    id: "gallery-6",
    title: "Seminar and workshop",
    category: "Events",
    image: "/images/Class1.png",
    alt: "Academic seminar and workshop",
  },
];

// ---------------------------------------------------------------------------
// Data fetching functions (Contentful or mock fallback)
// ---------------------------------------------------------------------------

async function isContentfulConfigured(): Promise<boolean> {
  return !!(
    process.env.CONTENTFUL_SPACE_ID && process.env.CONTENTFUL_ACCESS_TOKEN
  );
}

export async function getLatestNews(limit = 3): Promise<NewsArticle[]> {
  if (await isContentfulConfigured()) {
    try {
      const entries = await contentfulClient.getEntries<any>({
        content_type: "newsArticle",
        limit,
        order: ["-fields.publishedAt"],
      });

      return entries.items.map((item: any) => ({
        id: item.sys.id,
        slug: (item.fields.slug as string) ?? "",
        title: (item.fields.title as string) ?? "",
        excerpt: (item.fields.excerpt as string) ?? "",
        body: item.fields.body && typeof item.fields.body === "object" && "nodeType" in item.fields.body
          ? documentToHtmlString(item.fields.body as any)
          : "",
        category: (item.fields.category as string) ?? "",
        coverImage: (item.fields.coverImage as any)?.fields?.file?.url
          ? `https:${(item.fields.coverImage as any).fields.file.url}`
          : "/images/news-placeholder.jpg",
        author: (item.fields.author as string) ?? "",
        authorAvatar: (item.fields.authorAvatar as any)?.fields?.file?.url
          ? `https:${(item.fields.authorAvatar as any).fields.file.url}`
          : "/images/avatar-placeholder.jpg",
        publishedAt: (item.fields.publishedAt as string) ?? new Date().toISOString(),
        tags: Array.isArray(item.fields.tags) ? (item.fields.tags as string[]) : [],
      }));
    } catch (error) {
      console.error("Error fetching latest news from Contentful:", error);
    }
  }
  return MOCK_NEWS.slice(0, limit);
}

export async function getAllNews(): Promise<NewsArticle[]> {
  if (await isContentfulConfigured()) {
    try {
      const entries = await contentfulClient.getEntries<any>({
        content_type: "newsArticle",
        limit: 1000,
        order: ["-fields.publishedAt"],
      });

      return entries.items.map((item: any) => ({
        id: item.sys.id,
        slug: (item.fields.slug as string) ?? "",
        title: (item.fields.title as string) ?? "",
        excerpt: (item.fields.excerpt as string) ?? "",
        body: item.fields.body && typeof item.fields.body === "object" && "nodeType" in item.fields.body
          ? documentToHtmlString(item.fields.body as any)
          : "",
        category: (item.fields.category as string) ?? "",
        coverImage: (item.fields.coverImage as any)?.fields?.file?.url
          ? `https:${(item.fields.coverImage as any).fields.file.url}`
          : "/images/news-placeholder.jpg",
        author: (item.fields.author as string) ?? "",
        authorAvatar: (item.fields.authorAvatar as any)?.fields?.file?.url
          ? `https:${(item.fields.authorAvatar as any).fields.file.url}`
          : "/images/avatar-placeholder.jpg",
        publishedAt: (item.fields.publishedAt as string) ?? new Date().toISOString(),
        tags: Array.isArray(item.fields.tags) ? (item.fields.tags as string[]) : [],
      }));
    } catch (error) {
      console.error("Error fetching all news from Contentful:", error);
    }
  }
  return MOCK_NEWS;
}

export async function getNewsArticle(slug: string): Promise<NewsArticle | null> {
  if (await isContentfulConfigured()) {
    try {
      const entries = await contentfulClient.getEntries<any>({
        content_type: "newsArticle",
        "fields.slug": slug,
        limit: 1,
      });

      if (entries.items.length === 0) return null;

      const item = entries.items[0];
      return {
        id: item.sys.id,
        slug: (item.fields.slug as string) ?? "",
        title: (item.fields.title as string) ?? "",
        excerpt: (item.fields.excerpt as string) ?? "",
        body: item.fields.body && typeof item.fields.body === "object" && "nodeType" in item.fields.body
          ? documentToHtmlString(item.fields.body as any)
          : "",
        category: (item.fields.category as string) ?? "",
        coverImage: (item.fields.coverImage as any)?.fields?.file?.url
          ? `https:${(item.fields.coverImage as any).fields.file.url}`
          : "/images/news-placeholder.jpg",
        author: (item.fields.author as string) ?? "",
        authorAvatar: (item.fields.authorAvatar as any)?.fields?.file?.url
          ? `https:${(item.fields.authorAvatar as any).fields.file.url}`
          : "/images/avatar-placeholder.jpg",
        publishedAt: (item.fields.publishedAt as string) ?? new Date().toISOString(),
        tags: Array.isArray(item.fields.tags) ? (item.fields.tags as string[]) : [],
      };
    } catch (error) {
      console.error("Error fetching news article from Contentful:", error);
    }
  }
  return MOCK_NEWS.find((a) => a.slug === slug) ?? null;
}

export async function getAllNewsSlugs(): Promise<string[]> {
  const news = await getAllNews();
  return news.map((n) => n.slug);
}

export async function getFeaturedFaculties(): Promise<Faculty[]> {
  if (await isContentfulConfigured()) {
    try {
      const entries = await contentfulClient.getEntries<any>({
        content_type: "faculty",
        limit: 100,
      });

      return entries.items.map((item: any) => ({
        id: item.sys.id,
        slug: item.fields.slug ?? "",
        name: item.fields.name ?? "",
        shortName: item.fields.shortName ?? "",
        description: item.fields.description ?? "",
        coverImage: (item.fields.coverImage as any)?.fields?.file?.url
          ? `https:${(item.fields.coverImage as any).fields.file.url}`
          : "",
        icon: item.fields.icon ?? "",
        programCount: item.fields.programCount ?? 0,
        studentCount: item.fields.studentCount ?? 0,
        dean: item.fields.dean ?? "",
        featuredPrograms: Array.isArray(item.fields.featuredPrograms)
          ? item.fields.featuredPrograms
          : [],
      }));
    } catch (error) {
      console.error("Error fetching faculties from Contentful:", error);
    }
  }
  return MOCK_FACULTIES;
}

export async function getAllFaculties(): Promise<Faculty[]> {
  if (await isContentfulConfigured()) {
    try {
      const entries = await contentfulClient.getEntries<any>({
        content_type: "faculty",
        limit: 100,
      });

      return entries.items.map((item: any) => ({
        id: item.sys.id,
        slug: item.fields.slug ?? "",
        name: item.fields.name ?? "",
        shortName: item.fields.shortName ?? "",
        description: item.fields.description ?? "",
        coverImage: (item.fields.coverImage as any)?.fields?.file?.url
          ? `https:${(item.fields.coverImage as any).fields.file.url}`
          : "",
        icon: item.fields.icon ?? "",
        programCount: item.fields.programCount ?? 0,
        studentCount: item.fields.studentCount ?? 0,
        dean: item.fields.dean ?? "",
        featuredPrograms: Array.isArray(item.fields.featuredPrograms)
          ? item.fields.featuredPrograms
          : [],
      }));
    } catch (error) {
      console.error("Error fetching faculties from Contentful:", error);
    }
  }
  return MOCK_FACULTIES;
}

export async function getFaculty(slug: string): Promise<Faculty | null> {
  if (await isContentfulConfigured()) {
    try {
      const entries = await contentfulClient.getEntries<any>({
        content_type: "faculty",
        "fields.slug": slug,
        limit: 1,
      });

      if (entries.items.length === 0) return null;

      const item = entries.items[0];
      return {
        id: item.sys.id,
        slug: (item.fields.slug as string) ?? "",
        name: (item.fields.name as string) ?? "",
        shortName: (item.fields.shortName as string) ?? "",
        description: (item.fields.description as string) ?? "",
        coverImage: (item.fields.coverImage as any)?.fields?.file?.url
          ? `https:${(item.fields.coverImage as any).fields.file.url}`
          : "",
        icon: (item.fields.icon as string) ?? "",
        programCount: (item.fields.programCount as number) ?? 0,
        studentCount: (item.fields.studentCount as number) ?? 0,
        dean: (item.fields.dean as string) ?? "",
        featuredPrograms: Array.isArray(item.fields.featuredPrograms)
          ? (item.fields.featuredPrograms as string[])
          : [],
      };
    } catch (error) {
      console.error("Error fetching faculty from Contentful:", error);
    }
  }
  return MOCK_FACULTIES.find((f) => f.slug === slug) ?? null;
}

export async function getAllFacultySlugs(): Promise<string[]> {
  const faculties = await getAllFaculties();
  return faculties.map((f) => f.slug);
}

export async function getDepartmentsByFaculty(facultySlug: string): Promise<Department[]> {
  return MOCK_DEPARTMENTS.filter((department) => department.facultySlug === facultySlug);
}

export async function getAllDepartments(): Promise<Department[]> {
  return MOCK_DEPARTMENTS;
}

export async function getDepartment(
  facultySlug: string,
  departmentSlug: string
): Promise<Department | null> {
  return (
    MOCK_DEPARTMENTS.find(
      (department) =>
        department.facultySlug === facultySlug && department.slug === departmentSlug
    ) ?? null
  );
}

export async function getAllDepartmentParams(): Promise<
  { faculty: string; department: string }[]
> {
  return MOCK_DEPARTMENTS.map((department) => ({
    faculty: department.facultySlug,
    department: department.slug,
  }));
}

export async function getCoursesByDepartment(departmentSlug: string): Promise<Course[]> {
  return MOCK_COURSES.filter((course) => course.departmentSlug === departmentSlug);
}

export async function getAllCourses(): Promise<Course[]> {
  return MOCK_COURSES;
}

export async function getCourse(slug: string): Promise<Course | null> {
  return MOCK_COURSES.find((course) => course.slug === slug) ?? null;
}

export async function getAllCourseSlugs(): Promise<string[]> {
  return MOCK_COURSES.map((course) => course.slug);
}

export async function getUpcomingEvents(limit = 3): Promise<UniversityEvent[]> {
  if (await isContentfulConfigured()) {
    try {
      const entries = await contentfulClient.getEntries<any>({
        content_type: "universityEvent",
        limit,
        order: ["fields.startDate"],
      });

      return entries.items.map(mapEventEntry);
    } catch (error) {
      console.error("Error fetching upcoming events from Contentful:", error);
    }
  }
  return MOCK_EVENTS.slice(0, limit);
}

export async function getAllEvents(): Promise<UniversityEvent[]> {
  if (await isContentfulConfigured()) {
    try {
      const entries = await contentfulClient.getEntries<any>({
        content_type: "universityEvent",
        limit: 1000,
        order: ["fields.startDate"],
      });

      return entries.items.map(mapEventEntry);
    } catch (error) {
      console.error("Error fetching all events from Contentful:", error);
    }
  }
  return MOCK_EVENTS;
}

// Helper function to map Contentful event entry to UniversityEvent interface
function mapEventEntry(item: any): UniversityEvent {
  return {
    id: item.sys.id,
    slug: (item.fields.slug as string) ?? "",
    title: (item.fields.title as string) ?? "",
    description: (item.fields.description as string) ?? "",
    coverImage: (item.fields.coverImage as any)?.fields?.file?.url
      ? `https:${(item.fields.coverImage as any).fields.file.url}`
      : "",
    location: (item.fields.location as string) ?? "",
    startDate: (item.fields.startDate as string) ?? "",
    endDate: (item.fields.endDate as string) ?? "",
    category: (item.fields.category as string) ?? "",
    isFeatured: (item.fields.isFeatured as boolean) ?? false,
    registrationLink: item.fields.registrationLink ? (item.fields.registrationLink as string) : undefined,
  };
}

export async function getAllStaff(filters?: {
  faculty?: string;
  department?: string;
}): Promise<StaffMember[]> {
  return MOCK_STAFF.filter((staff) => {
    if (filters?.faculty && staff.facultySlug !== filters.faculty) return false;
    if (filters?.department && staff.departmentSlug !== filters.department) return false;
    return true;
  });
}

export async function getGalleryImages(): Promise<GalleryImage[]> {
  return MOCK_GALLERY;
}

export async function getAllLeaders(): Promise<Leader[]> {
  return MOCK_LEADERS;
}

export async function getVC(): Promise<Leader | null> {
  const leaders = await getAllLeaders();
  return leaders.find((l) => l.role === "vc") ?? null;
}
