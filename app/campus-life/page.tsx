import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Campus Life",
  description: "Explore student life, facilities, clubs, and campus experiences at NIIT.",
};

export default function CampusLifePage() {
  return (
    <div className="bg-white">
      <section className="bg-[#111827] py-20 text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading eyebrow="Campus Life" title="A focused, practical student experience." description="Campus life content is static public information that supports prospective student discovery." light />
        </div>
      </section>
      <section className="container mx-auto grid gap-10 px-4 py-20 lg:grid-cols-2 lg:px-8">
        <div className="relative aspect-[4/3] bg-gray-100">
          <Image src="/images/NIIT.webp" alt="NIIT campus life" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
        </div>
        <div>
          <h2 className="text-3xl font-extrabold text-[#1A1A2E]">Learning continues beyond the classroom.</h2>
          <p className="mt-5 leading-8 text-gray-600">
            Students build confidence through clubs, workshops, project showcases, leadership activities, and access to practical learning spaces.
          </p>
          <Link href="/gallery" className="mt-8 inline-flex items-center gap-2 bg-red-700 px-6 py-3 text-sm font-bold text-white">
            View gallery <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
