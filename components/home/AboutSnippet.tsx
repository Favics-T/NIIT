import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ABOUT_STATS } from "@/constants/stats";
import { ESTABLISHED_YEAR } from "@/constants/site";
import { TrendingUp, Users, Calendar } from "lucide-react";

const ICON_MAP = { TrendingUp, Users, Calendar } as const;

export function AboutSnippet() {
  return (
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left — text content */}
          <div className="flex flex-col justify-center">
            <SectionHeading
              eyebrow="NEXT"
              title={
                <>
                  Welcome to{" "}
                  <span className="text-red-700">NIIT,</span>
                  <br />
                  Creator of Underrated Graduated
                </>
              }
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
            />

            {/* Established badge */}
            <div className="mt-6 flex items-center gap-3">
              <div className="h-0.5 w-10 bg-red-600" />
              <p className="text-sm font-semibold text-gray-500">
                Established Since{" "}
                <span className="text-red-700 font-bold">{ESTABLISHED_YEAR}</span>
              </p>
            </div>

            <div className="mt-8">
              <Button href="/about" variant="primary" size="md">
                Learn More
              </Button>
            </div>
          </div>

          {/* Right — image + stats */}
          <div className="relative">
            {/* Building image placeholder */}
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src="/images/campus-building.jpg"
                alt="NIIT campus building"
                className="h-72 w-full object-cover lg:h-96"
              />
              {/* Red decorative bar */}
              <div className="absolute left-0 top-0 h-full w-1.5 bg-red-700" />
            </div>

            {/* Stats column — overlapping card */}
            <div className="mt-6 grid grid-cols-3 gap-4 lg:mt-0 lg:absolute lg:-bottom-6 lg:-right-6 lg:grid-cols-1 lg:gap-3 lg:w-44">
              {ABOUT_STATS.map((stat, i) => {
                const Icon = ICON_MAP[stat.icon as keyof typeof ICON_MAP] ?? TrendingUp;
                return (
                  <div
                    key={i}
                    className="flex flex-col items-center justify-center rounded-xl bg-[#1A1A2E] p-4 text-center shadow-xl"
                  >
                    <Icon size={20} className="mb-1 text-red-400" />
                    <div className="text-xl font-extrabold text-white">{stat.value}</div>
                    <div className="text-[10px] text-gray-400 mt-0.5">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
