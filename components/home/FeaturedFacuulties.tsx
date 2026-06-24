
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import type { Faculty } from "@/types/faculty";
import { Users, BookOpen, ArrowRight } from "lucide-react";
import Link from "next/link";

interface FeaturedFacultiesProps {
  faculties: Faculty[];
}

export function FeaturedFaculties({ faculties }: FeaturedFacultiesProps) {
  return (
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Faculties"
            title="Explore Our Academic Faculties"
            description="Choose from a wide range of accredited programmes taught by world-class faculty."
          />
          <Link
            href="/academics"
            className="flex items-center gap-1.5 text-sm font-semibold text-red-700 transition-colors hover:text-red-800 whitespace-nowrap"
          >
            View All Faculties <ArrowRight size={15} />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {faculties.map((faculty) => (
            <Link
              key={faculty.id}
              href={`/academics/${faculty.slug}`}
              className="group block overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
            >
              {/* Image */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={faculty.coverImage}
                  alt={faculty.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <Badge variant="red">{faculty.shortName}</Badge>
                </div>
              </div>

              {/* Body */}
              <div className="p-5">
                <h3 className="mb-2 text-sm font-bold text-[#1A1A2E] transition-colors group-hover:text-red-700">
                  {faculty.name}
                </h3>
                <p className="mb-4 text-xs leading-relaxed text-gray-500 line-clamp-2">
                  {faculty.description}
                </p>

                {/* Meta */}
                <div className="flex items-center gap-4 border-t border-gray-100 pt-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <BookOpen size={12} className="text-red-600" />
                    {faculty.programCount} Programs
                  </span>
                  <span className="flex items-center gap-1">
                    <Users size={12} className="text-red-600" />
                    {faculty.studentCount.toLocaleString()} Students
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
