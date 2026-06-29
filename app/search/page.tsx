import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getAllCourses, getAllDepartments, getAllNews } from "@/lib/contentful";
import { SearchClient, type SearchItem } from "./SearchClient";

export const metadata: Metadata = {
  title: "Search",
  description: "Search NIIT news, courses, and departments.",
};

export default async function SearchPage() {
  const [news, courses, departments] = await Promise.all([
    getAllNews(),
    getAllCourses(),
    getAllDepartments(),
  ]);

  const items: SearchItem[] = [
    ...news.map((article) => ({
      id: article.id,
      type: "News" as const,
      title: article.title,
      description: article.excerpt,
      href: `/news/${article.slug}`,
    })),
    ...courses.map((course) => ({
      id: course.id,
      type: "Course" as const,
      title: course.title,
      description: course.summary,
      href: `/courses/${course.slug}`,
    })),
    ...departments.map((department) => ({
      id: department.id,
      type: "Department" as const,
      title: department.name,
      description: department.overview,
      href: `/faculties/${department.facultySlug}/${department.slug}`,
    })),
  ];

  return (
    <div className="bg-white">
      <section className="bg-[#111827] py-20 text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading eyebrow="Search" title="Find content quickly." description="Search runs in the browser with debounced client-side filtering over a prepared content index." light />
        </div>
      </section>
      <section className="container mx-auto px-4 py-20 lg:px-8">
        <SearchClient items={items} />
      </section>
    </div>
  );
}

