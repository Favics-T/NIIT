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

import type { NewsArticle } from "@/types/news";
import type { Faculty } from "@/types/faculty";
import type { UniversityEvent } from "@/types/event";
import type { Leader } from "@/types/leader";

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
    // TODO: Replace with real Contentful query
    // const client = createClient({ space: process.env.CONTENTFUL_SPACE_ID!, accessToken: process.env.CONTENTFUL_ACCESS_TOKEN! });
    // const entries = await client.getEntries({ content_type: 'newsArticle', limit, order: '-fields.publishedAt' });
    // return entries.items.map(mapEntry);
  }
  return MOCK_NEWS.slice(0, limit);
}

export async function getAllNews(): Promise<NewsArticle[]> {
  if (await isContentfulConfigured()) {
    // Contentful query
  }
  return MOCK_NEWS;
}

export async function getNewsArticle(slug: string): Promise<NewsArticle | null> {
  if (await isContentfulConfigured()) {
    // Contentful query by slug
  }
  return MOCK_NEWS.find((a) => a.slug === slug) ?? null;
}

export async function getAllNewsSlugs(): Promise<string[]> {
  const news = await getAllNews();
  return news.map((n) => n.slug);
}

export async function getFeaturedFaculties(): Promise<Faculty[]> {
  if (await isContentfulConfigured()) {
    // Contentful query
  }
  return MOCK_FACULTIES;
}

export async function getAllFaculties(): Promise<Faculty[]> {
  return MOCK_FACULTIES;
}

export async function getFaculty(slug: string): Promise<Faculty | null> {
  if (await isContentfulConfigured()) {
    // Contentful query
  }
  return MOCK_FACULTIES.find((f) => f.slug === slug) ?? null;
}

export async function getAllFacultySlugs(): Promise<string[]> {
  const faculties = await getAllFaculties();
  return faculties.map((f) => f.slug);
}

export async function getUpcomingEvents(limit = 3): Promise<UniversityEvent[]> {
  if (await isContentfulConfigured()) {
    // Contentful query
  }
  return MOCK_EVENTS.slice(0, limit);
}

export async function getAllLeaders(): Promise<Leader[]> {
  return MOCK_LEADERS;
}

export async function getVC(): Promise<Leader | null> {
  const leaders = await getAllLeaders();
  return leaders.find((l) => l.role === "vc") ?? null;
}
