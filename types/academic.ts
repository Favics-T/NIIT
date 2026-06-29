export interface Department {
  id: string;
  slug: string;
  facultySlug: string;
  name: string;
  overview: string;
  head: string;
  courseSlugs: string[];
}

export interface Course {
  id: string;
  slug: string;
  departmentSlug: string;
  facultySlug: string;
  title: string;
  summary: string;
  duration: string;
  degree: string;
  requirements: string[];
  careerPaths: string[];
}

