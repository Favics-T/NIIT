import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  Cpu,
  Globe,
  GraduationCap,
  Monitor,
  Network,
  ShieldCheck,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getAllFaculties } from "@/lib/contentful";
import { SITE_DESCRIPTION, SITE_NAME } from "@/constants/site";

export const metadata: Metadata = {
  title: "Academics",
  description:
    "Explore NIIT academic programmes, faculties, curriculum focus areas, and practical learning pathways.",
  alternates: {
    canonical: "/academics",
  },
  openGraph: {
    title: `Academics | ${SITE_NAME}`,
    description: SITE_DESCRIPTION,
    url: "/academics",
    type: "website",
    images: [
      {
        url: "/images/Class1.png",
        width: 1200,
        height: 630,
        alt: "NIIT academic programmes and classroom learning",
      },
    ],
  },
};

const fallbackImages = ["/images/Class1.png", "/images/Class2.png", "/images/NIIT.webp"];

const iconMap = {
  Briefcase,
  Cpu,
  Globe,
  Monitor,
} as const;

const curriculumPillars = [
  {
    title: "Foundation Knowledge",
    description:
      "Students build strong fundamentals in mathematics, communication, computing, and discipline-specific theory.",
    icon: GraduationCap,
  },
  {
    title: "Applied Studio Work",
    description:
      "Labs, workshops, case studies, and team projects turn concepts into portfolio-ready practical output.",
    icon: Cpu,
  },
  {
    title: "Industry Readiness",
    description:
      "Professional practice, technical writing, internships, and career preparation are built into each pathway.",
    icon: Briefcase,
  },
  {
    title: "Research and Innovation",
    description:
      "Final-year projects and faculty mentoring help students investigate problems with measurable impact.",
    icon: Network,
  },
];

const learningPathways = [
  "Undergraduate degree programmes",
  "Professional certificates and bridge courses",
  "Laboratory-led practical modules",
  "Internship and capstone project tracks",
];

function getFacultyImage(coverImage: string, index: number) {
  if (coverImage.endsWith(".jpg")) {
    return fallbackImages[index % fallbackImages.length];
  }

  return coverImage;
}

export default async function AcademicsPage() {
  const faculties = await getAllFaculties();

  const totalPrograms = faculties.reduce(
    (total, faculty) => total + faculty.programCount,
    0
  );
  
  const totalStudents = faculties.reduce(
    (total, faculty) => total + faculty.studentCount,
    0
  );

  return (
    <div className="bg-white">
      <section className="relative overflow-hidden bg-[#111827] text-white">
        <div className="absolute inset-0">
          <Image
            src="/images/Class2.png"
            alt="Students learning in a modern NIIT classroom"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-[#111827]/80" />
        </div>

        <div className="container relative mx-auto px-4 py-24 lg:px-8 lg:py-32">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-red-300">
              Academics
            </p>
            <h1 className="text-4xl font-extrabold leading-tight md:text-6xl">
              Programmes built for deep learning and practical careers.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-200">
              Explore faculties, courses, and curriculum pathways designed to help
              students master core knowledge, build real projects, and graduate ready
              for modern work.
            </p>
          </div>

          <div className="mt-12 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { label: "Academic faculties", value: faculties.length },
              { label: "Programmes", value: totalPrograms },
              { label: "Students enrolled", value: `${Math.round(totalStudents / 100) / 10}k+` },
            ].map((stat) => (
              <div
                key={stat.label}
                className="border border-white/15 bg-white/10 p-5 backdrop-blur"
              >
                <div className="text-3xl font-extrabold text-white">{stat.value}</div>
                <div className="mt-1 text-sm font-medium text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <SectionHeading
            eyebrow="Academic Model"
            title="Structured pathways from fundamentals to professional practice."
            description="NIIT academic programmes are organised around progressive learning: core concepts, guided application, industry exposure, and final-year specialisation."
          />

          <div className="grid gap-4 sm:grid-cols-2">
            {curriculumPillars.map(({ title, description, icon: Icon }) => (
              <article key={title} className="border border-gray-200 p-6">
                <div className="mb-5 flex h-11 w-11 items-center justify-center bg-red-700 text-white">
                  <Icon size={22} />
                </div>
                <h2 className="text-lg font-extrabold text-[#1A1A2E]">{title}</h2>
                <p className="mt-3 text-sm leading-6 text-gray-600">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading
            eyebrow="Faculties and Programmes"
            title="Choose a faculty, then follow the programme path."
            description="Each faculty combines specialist courses, practical teaching, and academic mentoring around a clear professional direction."
            className="mb-12"
          />

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {faculties.map((faculty, index) => {
              const Icon = iconMap[faculty.icon as keyof typeof iconMap] ?? GraduationCap;

              return (
                <article
                  key={faculty.id}
                  className="group overflow-hidden border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative aspect-4/3 bg-gray-100">
                    <Image
                      src={getFacultyImage(faculty.coverImage, index)}
                      alt={faculty.name}
                      fill
                      sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover transition duration-300 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-6">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center bg-[#1A1A2E] text-white">
                      <Icon size={22} />
                    </div>
                    <h2 className="text-xl font-extrabold text-[#1A1A2E]">
                      {faculty.shortName}
                    </h2>
                    <p className="mt-3 text-sm leading-6 text-gray-600">
                      {faculty.description}
                    </p>

                    <div className="mt-5 grid grid-cols-2 gap-3 border-y border-gray-100 py-4">
                      <div>
                        <p className="text-2xl font-extrabold text-red-700">
                          {faculty.programCount}
                        </p>
                        <p className="text-xs font-semibold text-gray-500">Programmes</p>
                      </div>
                      <div>
                        <p className="text-2xl font-extrabold text-red-700">
                          {faculty.studentCount.toLocaleString()}
                        </p>
                        <p className="text-xs font-semibold text-gray-500">Students</p>
                      </div>
                    </div>

                    <div className="mt-5">
                      <p className="text-xs font-bold uppercase tracking-[0.14em] text-gray-400">
                        Featured courses
                      </p>
                      <ul className="mt-3 space-y-2 text-sm text-gray-600">
                        {faculty.featuredPrograms.map((program) => (
                          <li key={program} className="flex items-start gap-2">
                            <ShieldCheck
                              size={16}
                              className="mt-0.5 shrink-0 text-red-700"
                            />
                            {program}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Link
                      href={`/academics/${faculty.slug}`}
                      className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-red-700 transition hover:text-red-800"
                    >
                      View pathway
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Learning Pathways"
              title="Multiple routes into the same high-standard academic experience."
              description="Programme information is organised so students can compare pathways, understand practical expectations, and choose a direction with confidence."
              className="mb-8"
            />
            <div className="grid gap-3 sm:grid-cols-2">
              {learningPathways.map((pathway) => (
                <div
                  key={pathway}
                  className="border border-gray-200 bg-white px-5 py-4 text-sm font-semibold text-[#1A1A2E]"
                >
                  {pathway}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#1A1A2E] p-8 text-white">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-red-300">
              Admissions Focus
            </p>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight">
              Pick a direction, then build evidence of skill.
            </h2>
            <p className="mt-4 leading-7 text-gray-300">
              Students are encouraged to choose a programme that matches their
              strengths, then graduate with projects, internships, and academic work
              that show what they can do.
            </p>
            <Link
              href="/admissions"
              className="mt-8 inline-flex items-center gap-2 bg-red-700 px-6 py-3 text-sm font-bold text-white transition hover:bg-red-800"
            >
              Admissions information
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
