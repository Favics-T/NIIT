import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  getAllDepartmentParams,
  getCoursesByDepartment,
  getDepartment,
  getFaculty,
} from "@/lib/contentful";

type Props = { params: Promise<{ faculty: string; department: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllDepartmentParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { faculty, department } = await params;
  const record = await getDepartment(faculty, department);
  return { title: record ? record.name : "Department", description: record?.overview };
}

export default async function DepartmentPage({ params }: Props) {
  const { faculty: facultySlug, department: departmentSlug } = await params;
  const [faculty, department, courses] = await Promise.all([
    getFaculty(facultySlug),
    getDepartment(facultySlug, departmentSlug),
    getCoursesByDepartment(departmentSlug),
  ]);
  if (!faculty || !department) notFound();

  return (
    <div className="bg-white">
      <section className="bg-[#111827] py-20 text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading eyebrow={faculty.name} title={department.name} description={department.overview} light />
          <p className="mt-6 text-gray-300">Department Head: {department.head}</p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20 lg:px-8">
        <SectionHeading
          eyebrow="Courses"
          title="Programmes offered by this department."
          description="Course cards are generated from the CMS relationship between department and course entries."
          className="mb-10"
        />
        <div className="grid gap-6 md:grid-cols-2">
          {courses.map((course) => (
            <article key={course.id} className="border border-gray-200 p-6">
              <h2 className="text-xl font-extrabold text-[#1A1A2E]">{course.title}</h2>
              <p className="mt-3 leading-7 text-gray-600">{course.summary}</p>
              <div className="mt-4 text-sm font-semibold text-red-700">{course.degree} - {course.duration}</div>
              <ul className="mt-5 space-y-2 text-sm text-gray-600">
                {course.requirements.slice(0, 3).map((requirement) => (
                  <li key={requirement} className="flex gap-2">
                    <CheckCircle2 size={16} className="mt-0.5 text-red-700" />
                    {requirement}
                  </li>
                ))}
              </ul>
              <Link href={`/courses/${course.slug}`} className="mt-6 inline-flex items-center gap-2 font-bold text-red-700">
                Course details <ArrowRight size={16} />
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
