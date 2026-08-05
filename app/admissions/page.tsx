import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Admissions",
  description: "NIIT admissions information, application steps, and entry requirements.",
};

const steps = [
  "Choose your preferred faculty and programme.",
  "Review entry requirements and prepare academic documents.",
  "Submit the application form and supporting records.",
  "Attend screening or interview if required.",
  "Receive admission decision and complete enrollment.",
];

export default function AdmissionsPage() {
  return (
    <div className="bg-white">
      <section className="bg-[#111827] py-20 text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading eyebrow="Admissions" title="Start your NIIT application." description="Admissions is on for new students." light />
        </div>
      </section>
      <section className="container mx-auto grid gap-10 px-4 py-20 lg:grid-cols-[1fr_0.8fr] lg:px-8">
        <div>
          <h2 className="text-2xl font-extrabold text-[#1A1A2E]">Application steps</h2>
          <div className="mt-6 space-y-4">
            {steps.map((step, index) => (
              <div key={step} className="flex gap-4 border border-gray-200 p-5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center bg-red-700 text-sm font-bold text-white">{index + 1}</div>
                <p className="font-semibold text-gray-700">{step}</p>
              </div>
            ))}
          </div>
        </div>
        <aside className="bg-gray-50 p-8">
          <h2 className="text-2xl font-extrabold text-[#1A1A2E]">General requirements</h2>
          <ul className="mt-6 space-y-3">
            {["English Language", "Mathematics", "Relevant subject credits", "Academic transcript or result slip"].map((item) => (
              <li key={item} className="flex gap-3 text-gray-600">
                <CheckCircle2 size={18} className="mt-1 text-red-700" />
                {item}
              </li>
            ))}
          </ul>
          <Link href="/contact" className="mt-8 inline-flex items-center gap-2 bg-red-700 px-6 py-3 text-sm font-bold text-white">
            Ask admissions <ArrowRight size={16} />
          </Link>
        </aside>
      </section>
    </div>
  );
}

