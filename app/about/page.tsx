import type { Metadata } from "next";
import Image from "next/image";
import { Award, BookOpen, Building2, Lightbulb, Target, Users } from "lucide-react";
import { getAllLeaders } from "@/lib/contentful";
import { ESTABLISHED_YEAR, SITE_DESCRIPTION, SITE_NAME } from "@/constants/site";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about NIIT's history, mission, vision, academic leadership, and commitment to industry-ready education.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: `About ${SITE_NAME}`,
    description: SITE_DESCRIPTION,
    url: "/about",
    type: "website",
    images: [
      {
        url: "/images/NIIT.webp",
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} campus community`,
      },
    ],
  },
};

const milestones = [
  {
    year: "1980",
    title: "Founded for applied learning",
    description:
      "NIIT began with a focus on practical technology education and strong links between classroom learning and industry needs.",
  },
  {
    year: "1998",
    title: "Expanded academic schools",
    description:
      "New faculties in engineering, business, and information technology broadened access to professional degree pathways.",
  },
  {
    year: "2012",
    title: "Research and innovation centres",
    description:
      "Dedicated labs and innovation spaces opened to support student projects, faculty research, and employer collaboration.",
  },
  {
    year: "2025",
    title: "National recognition",
    description:
      "NIIT was recognised for academic excellence, student employability, and technology-driven teaching.",
  },
];

const values = [
  {
    title: "Academic Excellence",
    description:
      "Rigorous programmes, experienced faculty, and continuous curriculum review keep learning outcomes strong.",
    icon: Award,
  },
  {
    title: "Industry Relevance",
    description:
      "Courses are shaped around workplace skills, applied projects, and partnerships with employers.",
    icon: Building2,
  },
  {
    title: "Student Growth",
    description:
      "Advising, mentoring, and student support services help learners build confidence and direction.",
    icon: Users,
  },
  {
    title: "Innovation",
    description:
      "Students are encouraged to solve real problems through research, technology, and entrepreneurship.",
    icon: Lightbulb,
  },
];

function getLeaderPhoto(photo: string) {
  return photo.includes("placeholder") ? "/images/NIIT.webp" : photo;
}

export default async function AboutPage() {
  const leaders = await getAllLeaders();
  const yearsOfImpact = new Date().getFullYear() - ESTABLISHED_YEAR;

  return (
    <div className="bg-white">
      <section className="relative overflow-hidden bg-[#0D0D1A] text-white">
        <div className="absolute inset-0">
          <Image
            src="/images/NIIT.webp"
            alt="NIIT students and academic community"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-[#0D0D1A]/75" />
        </div>

        <div className="container relative mx-auto px-4 py-24 lg:px-8 lg:py-32">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-red-300">
              About NIIT
            </p>
            <h1 className="text-4xl font-extrabold leading-tight md:text-6xl">
              Building skilled graduates for a technology-led future.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-200">
              Since {ESTABLISHED_YEAR}, {SITE_NAME} has combined academic depth,
              applied learning, and industry partnerships to prepare students for
              meaningful work and lifelong impact.
            </p>
          </div>

          <div className="mt-12 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { label: "Years of impact", value: `${yearsOfImpact}+` },
              { label: "Academic faculties", value: "4" },
              { label: "Learner-first culture", value: "100%" },
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
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <SectionHeading
            eyebrow="History"
            title="A practical institution shaped by real-world needs."
            description="NIIT's story is rooted in access, employability, and the belief that excellent education should connect knowledge with useful action."
          />

          <div className="space-y-8">
            <p className="text-lg leading-8 text-gray-600">
              What began as a focused technology training institute has grown into a
              multidisciplinary academic community. Our programmes now span engineering,
              computer science, business, and information technology while preserving the
              original commitment to hands-on, career-relevant learning.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {milestones.map((item) => (
                <article key={item.year} className="border border-gray-200 p-6">
                  <div className="text-sm font-extrabold text-red-700">{item.year}</div>
                  <h2 className="mt-3 text-lg font-bold text-[#1A1A2E]">{item.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-gray-600">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading
            eyebrow="Vision and Mission"
            title="Clear purpose, measurable student outcomes."
            description="Our academic direction is designed around strong teaching, ethical leadership, and graduates who can contribute immediately."
            align="center"
            className="mb-12"
          />

          <div className="grid gap-6 lg:grid-cols-2">
            <article className="border border-gray-200 bg-white p-8">
              <div className="mb-5 flex h-12 w-12 items-center justify-center bg-red-700 text-white">
                <Target size={24} />
              </div>
              <h2 className="text-2xl font-extrabold text-[#1A1A2E]">Our Vision</h2>
              <p className="mt-4 leading-8 text-gray-600">
                To be a leading institution recognised for transforming society through
                technology-driven education, applied research, and graduates who solve
                meaningful problems.
              </p>
            </article>

            <article className="border border-gray-200 bg-white p-8">
              <div className="mb-5 flex h-12 w-12 items-center justify-center bg-[#1A1A2E] text-white">
                <BookOpen size={24} />
              </div>
              <h2 className="text-2xl font-extrabold text-[#1A1A2E]">Our Mission</h2>
              <ul className="mt-4 space-y-3 leading-7 text-gray-600">
                <li>Deliver rigorous, industry-relevant academic programmes.</li>
                <li>Build ethical leaders with critical thinking and practical skills.</li>
                <li>Support research, innovation, and entrepreneurship across faculties.</li>
                <li>Partner with communities and employers for sustainable impact.</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20 lg:px-8">
        <SectionHeading
          eyebrow="Leadership"
          title="Experienced academic leaders guiding the institution."
          description="NIIT's leadership team brings together research experience, faculty governance, and a shared commitment to student success."
          className="mb-12"
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {leaders.map((leader) => (
            <article
              key={leader.id}
              className="overflow-hidden border border-gray-200 bg-white shadow-sm"
            >
              <div className="relative aspect-[4/3] bg-gray-100">
                <Image
                  src={getLeaderPhoto(leader.photo)}
                  alt={leader.name}
                  fill
                  sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-red-700">
                  {leader.title}
                </p>
                <h2 className="mt-2 text-xl font-extrabold text-[#1A1A2E]">
                  {leader.name}
                </h2>
                <p className="mt-3 text-sm leading-6 text-gray-600">{leader.bio}</p>
                <div className="mt-5 border-t border-gray-100 pt-4">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-gray-400">
                    Qualifications
                  </p>
                  <p className="mt-2 text-sm text-gray-600">
                    {leader.qualifications.slice(0, 2).join(" | ")}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#1A1A2E] py-20 text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading
            eyebrow="Values"
            title="The principles behind the NIIT experience."
            description="These values shape how the institution designs programmes, supports students, and measures academic quality."
            light
            className="mb-12"
          />

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {values.map(({ title, description, icon: Icon }) => (
              <article key={title} className="border border-white/10 bg-white/5 p-6">
                <div className="mb-5 flex h-11 w-11 items-center justify-center bg-red-700 text-white">
                  <Icon size={22} />
                </div>
                <h2 className="text-lg font-extrabold">{title}</h2>
                <p className="mt-3 text-sm leading-6 text-gray-300">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
