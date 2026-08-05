import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, BookOpen, Users } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getAllFacultySlugs, getDepartmentsByFaculty, getFaculty } from "@/lib/contentful";

type Props = { params: Promise<{ faculty: string }> };

export async function generateStaticParams() {
  return (await getAllFacultySlugs()).map((faculty) => ({ faculty }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { faculty: slug } = await params;
  const faculty = await getFaculty(slug);
  return {
    title: faculty ? faculty.name : "Faculty",
    description: faculty?.description,
  };
}

export default async function FacultyPage({ params }: Props) {
  const { faculty: slug } = await params;
  const faculty = await getFaculty(slug);
  if (!faculty) notFound();

  const departments = await getDepartmentsByFaculty(slug);

  return (
    <div className="bg-white">
      <section className="bg-[#111827] py-20 text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading eyebrow="Faculty" title={faculty.name} description={faculty.description} light />
          <p className="mt-6 max-w-2xl text-gray-300">Dean: {faculty.dean}</p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20 lg:px-8">
        <SectionHeading
          eyebrow="Departments"
          title="Department breakdown and course pathways."
          description="All faculty department pages are prerendered from CMS slugs with generateStaticParams."
          className="mb-10"
        />
        <div className="grid gap-6 md:grid-cols-2">
          {departments.map((department) => (
            <article key={department.id} className="border border-gray-200 p-6">
              <BookOpen className="mb-4 text-red-700" size={26} />
              <h2 className="text-xl font-extrabold text-[#1A1A2E]">{department.name}</h2>
              <p className="mt-3 leading-7 text-gray-600">{department.overview}</p>
              <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-gray-500">
                <Users size={16} /> Head: {department.head}
              </div>
              <Link href={`/faculties/${slug}/${department.slug}`} className="mt-6 inline-flex items-center gap-2 font-bold text-red-700">
                View department <ArrowRight size={16} />
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
