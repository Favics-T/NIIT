import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getAllCourseSlugs, getCourse } from "@/lib/contentful";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getAllCourseSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourse(slug);
  return { title: course ? course.title : "Course", description: course?.summary };
}

export default async function CoursePage({ params }: Props) {
  const { slug } = await params;
  const course = await getCourse(slug);
  if (!course) notFound();

  return (
    <div className="bg-white">
      <section className="bg-[#111827] py-20 text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading eyebrow={course.degree} title={course.title} description={course.summary} light />
          <p className="mt-6 text-gray-300">Duration: {course.duration}</p>
        </div>
      </section>
      <section className="container mx-auto grid gap-10 px-4 py-20 md:grid-cols-2 lg:px-8">
        <div>
          <h2 className="text-2xl font-extrabold text-[#1A1A2E]">Admission requirements</h2>
          <ul className="mt-6 space-y-3">
            {course.requirements.map((item) => (
              <li key={item} className="flex gap-3 text-gray-600">
                <CheckCircle2 size={18} className="mt-1 text-red-700" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-extrabold text-[#1A1A2E]">Career pathways</h2>
          <ul className="mt-6 space-y-3">
            {course.careerPaths.map((item) => (
              <li key={item} className="flex gap-3 text-gray-600">
                <CheckCircle2 size={18} className="mt-1 text-red-700" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

