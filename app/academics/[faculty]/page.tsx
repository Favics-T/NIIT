import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Briefcase,
  CalendarDays,
  CheckCircle2,
  Cpu,
  FileText,
  Globe,
  GraduationCap,
  Monitor,
  Users,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getAllFacultySlugs, getFaculty } from "@/lib/contentful";
import { SITE_NAME } from "@/constants/site";

type FacultyPageProps = {
  params: Promise<{
    faculty: string;
  }>;
};

const fallbackImages = ["/images/Class1.png", "/images/Class2.png", "/images/NIIT.webp"];

const iconMap = {
  Briefcase,
  Cpu,
  Globe,
  Monitor,
} as const;

const admissionRequirements = [
  "Five credit passes including English Language and Mathematics.",
  "Relevant science, business, or technology subjects for the selected programme.",
  "Completed application form with academic records and personal statement.",
  "Interview or placement review where required by the faculty.",
];

function getFacultyImage(coverImage: string, index = 0) {
  if (coverImage.endsWith(".jpg")) {
    return fallbackImages[index % fallbackImages.length];
  }

  return coverImage;
}

export async function generateStaticParams() {
  const slugs = await getAllFacultySlugs();

  return slugs.map((faculty) => ({
    faculty,
  }));
}

export async function generateMetadata({
  params,
}: FacultyPageProps): Promise<Metadata> {
  const { faculty: slug } = await params;
  const faculty = await getFaculty(slug);

  if (!faculty) {
    return {
      title: "Academic Faculty",
    };
  }

  return {
    title: faculty.shortName,
    description: `${faculty.name} at ${SITE_NAME}: programmes, curriculum focus, admission requirements, and academic leadership.`,
    alternates: {
      canonical: `/academics/${faculty.slug}`,
    },
    openGraph: {
      title: `${faculty.name} | ${SITE_NAME}`,
      description: faculty.description,
      url: `/academics/${faculty.slug}`,
      type: "website",
      images: [
        {
          url: getFacultyImage(faculty.coverImage),
          width: 1200,
          height: 630,
          alt: faculty.name,
        },
      ],
    },
  };
}

export default async function FacultyAcademicPage({ params }: FacultyPageProps) {
  const { faculty: slug } = await params;
  const faculty = await getFaculty(slug);

  if (!faculty) {
    notFound();
  }

  const Icon = iconMap[faculty.icon as keyof typeof iconMap] ?? GraduationCap;
  const programmeProfiles = faculty.featuredPrograms.map((program, index) => ({
    name: program,
    duration: index === 0 ? "4 years" : "3-4 years",
    mode: "Full-time",
    focus:
      index === 0
        ? "Core theory, supervised labs, and a final-year capstone project."
        : "Specialist modules, applied coursework, and workplace preparation.",
  }));

  return (
    <div className="bg-white">
      <section className="relative overflow-hidden bg-[#111827] text-white">
        <div className="absolute inset-0">
          <Image
            src={getFacultyImage(faculty.coverImage)}
            alt={faculty.name}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-[#111827]/80" />
        </div>

        <div className="container relative mx-auto px-4 py-20 lg:px-8 lg:py-28">
          <Link
            href="/academics"
            className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-red-200 transition hover:text-white"
          >
            <ArrowLeft size={16} />
            Back to academics
          </Link>

          <div className="max-w-3xl">
            <div className="mb-5 flex h-14 w-14 items-center justify-center bg-red-700 text-white">
              <Icon size={28} />
            </div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-red-300">
              Academic Faculty
            </p>
            <h1 className="text-4xl font-extrabold leading-tight md:text-6xl">
              {faculty.name}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-200">
              {faculty.description}
            </p>
          </div>

          <div className="mt-12 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { label: "Programmes", value: faculty.programCount },
              { label: "Students", value: faculty.studentCount.toLocaleString() },
              { label: "Dean", value: faculty.dean },
            ].map((stat) => (
              <div
                key={stat.label}
                className="border border-white/15 bg-white/10 p-5 backdrop-blur"
              >
                <div className="text-2xl font-extrabold text-white">{stat.value}</div>
                <div className="mt-1 text-sm font-medium text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20 lg:px-8">
        <SectionHeading
          eyebrow="Programmes"
          title={`Study pathways in ${faculty.shortName}.`}
          description="Each programme combines structured coursework, guided practical sessions, and assessment that prepares students for professional expectations."
          className="mb-12"
        />

        <div className="grid gap-6 md:grid-cols-3">
          {programmeProfiles.map((program) => (
            <article key={program.name} className="border border-gray-200 bg-white p-6">
              <h2 className="text-xl font-extrabold text-[#1A1A2E]">{program.name}</h2>
              <p className="mt-3 text-sm leading-6 text-gray-600">{program.focus}</p>
              <div className="mt-6 space-y-3 border-t border-gray-100 pt-5 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <CalendarDays size={16} className="text-red-700" />
                  Duration: {program.duration}
                </div>
                <div className="flex items-center gap-2">
                  <Users size={16} className="text-red-700" />
                  Mode: {program.mode}
                </div>
                <div className="flex items-center gap-2">
                  <FileText size={16} className="text-red-700" />
                  Capstone assessment
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <SectionHeading
              eyebrow="Admission Requirements"
              title="Clear entry expectations for focused applicants."
              description="Requirements may vary by programme, but every applicant is reviewed for academic readiness and fit for the selected pathway."
            />

            <div className="grid gap-4 sm:grid-cols-2">
              {admissionRequirements.map((requirement) => (
                <div key={requirement} className="border border-gray-200 bg-white p-5">
                  <CheckCircle2 size={20} className="mb-4 text-red-700" />
                  <p className="text-sm leading-6 text-gray-600">{requirement}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
