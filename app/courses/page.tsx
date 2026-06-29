import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, GraduationCap } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getAllCourses } from "@/lib/contentful";

export const metadata: Metadata = {
  title: "Courses",
  description: "Browse NIIT courses, durations, admission requirements, and career pathways.",
};

export default async function CoursesPage() {
  const courses = await getAllCourses();

  return (
    <div className="bg-white">
      <section className="bg-[#111827] py-20 text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading eyebrow="Courses" title="Static course catalogue." description="Courses are SSG because details change slowly and are important for search visibility." light />
        </div>
      </section>
      <section className="container mx-auto grid gap-6 px-4 py-20 md:grid-cols-2 lg:px-8">
        {courses.map((course) => (
          <article key={course.id} className="border border-gray-200 p-6">
            <GraduationCap className="mb-4 text-red-700" />
            <h2 className="text-xl font-extrabold text-[#1A1A2E]">{course.title}</h2>
            <p className="mt-3 leading-7 text-gray-600">{course.summary}</p>
            <Link href={`/courses/${course.slug}`} className="mt-6 inline-flex items-center gap-2 font-bold text-red-700">
              View course <ArrowRight size={16} />
            </Link>
          </article>
        ))}
      </section>
    </div>
  );
}

