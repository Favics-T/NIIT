// src/components/home/WhyChooseUs.tsx
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WHY_CHOOSE_US } from "@/constants/steps";
import { Briefcase, Building2, Users, FlaskConical } from "lucide-react";

const ICON_MAP = { Briefcase, Building2, Users, FlaskConical } as const;

export function WhyChooseUs() {
  return (
    <section className="bg-gray-50 py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: heading + image */}
          <div>
            <SectionHeading
              eyebrow="Why Us"
              title={
                <>
                  Why We Are the Right Fit for{" "}
                  <span className="text-red-700">Your Educational Future</span>
                </>
              }
              description="We combine academic rigour with practical experience to produce graduates who are sought-after worldwide."
            />

            {/* Image placeholder */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="relative overflow-hidden rounded-xl">
                <img
                  src="/images/why-us-1.jpg"
                  alt="Students collaborating"
                  className="h-48 w-full object-cover"
                />
              </div>
              <div className="relative overflow-hidden rounded-xl">
                <img
                  src="/images/why-us-2.jpg"
                  alt="Campus innovation hub"
                  className="h-48 w-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right: 4 feature cards */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {WHY_CHOOSE_US.map((feature, i) => {
              const Icon = ICON_MAP[feature.icon as keyof typeof ICON_MAP] ?? Briefcase;
              return (
                <div
                  key={i}
                  className="group rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-red-100 hover:shadow-lg"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 transition-colors group-hover:bg-red-100">
                    <Icon size={22} className="text-red-700" />
                  </div>
                  <h3 className="mb-2 text-sm font-bold text-[#1A1A2E]">
                    {feature.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-gray-500">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
