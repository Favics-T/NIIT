import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Briefcase, Cpu, Globe, GraduationCap, Monitor } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getAllFaculties, getDepartmentsByFaculty } from "@/lib/contentful";

export const metadata: Metadata = {
  title: "Faculties",
  description: "Explore NIIT faculties, departments, programmes, and academic leadership.",
};

const iconMap = { Briefcase, Cpu, Globe, Monitor } as const;

export default async function FacultiesPage() {
  const faculties = await getAllFaculties();
  const departmentCounts = await Promise.all(
    faculties.map(async (faculty) => ({
      slug: faculty.slug,
      count: (await getDepartmentsByFaculty(faculty.slug)).length,
    }))
  );

  return (
    <div className="bg-white">
      <section className="bg-[#111827] py-20 text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading
            eyebrow="Faculties"
            title="Academic homes for every programme pathway."
            description="Faculty content is statically generated because the structure changes infrequently and should load quickly for prospective students."
            light
          />
        </div>
      </section>

      <section className="container mx-auto px-4 py-20 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          {faculties.map((faculty) => {
            const Icon = iconMap[faculty.icon as keyof typeof iconMap] ?? GraduationCap;
            const count =
              departmentCounts.find((item) => item.slug === faculty.slug)?.count ?? 0;

            return (
              <article key={faculty.id} className="overflow-hidden border border-gray-200 bg-white shadow-sm">
                <div className="relative aspect-[16/9] bg-gray-100">
                  <Image
                    src={faculty.coverImage.endsWith(".jpg") ? "/images/NIIT.webp" : faculty.coverImage}
                    alt={faculty.name}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center bg-red-700 text-white">
                    <Icon size={22} />
                  </div>
                  <h2 className="text-2xl font-extrabold text-[#1A1A2E]">{faculty.name}</h2>
                  <p className="mt-3 leading-7 text-gray-600">{faculty.description}</p>
                  <div className="mt-5 grid grid-cols-3 gap-3 border-y border-gray-100 py-4 text-sm">
                    <div><strong className="block text-xl text-red-700">{count}</strong>Departments</div>
                    <div><strong className="block text-xl text-red-700">{faculty.programCount}</strong>Programmes</div>
                    <div><strong className="block text-xl text-red-700">{faculty.studentCount.toLocaleString()}</strong>Students</div>
                  </div>
                  <Link href={`/faculties/${faculty.slug}`} className="mt-6 inline-flex items-center gap-2 font-bold text-red-700">
                    View faculty <ArrowRight size={16} />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}

