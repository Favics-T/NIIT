import { Button } from "@/components/ui/Button";
import { HERO_STATS } from "@/constants/stats";
import { GraduationCap, Award, Trophy } from "lucide-react";

const ICON_MAP = {
  GraduationCap,
  Award,
  Trophy,
} as const;

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] overflow-hidden bg[#0D0D1A]">
      {/* Background image placeholder */}
      <div className="absolute inset-0">
        <img
          src="/images/NIIT.webp"
          alt="NIIT students and campus"
          className="h-full w-full object-cover object-center"
          // Replace src with your actual hero image
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D1A]/90 via-[#0D0D1A]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D1A]/60 via-transparent to-transparent" />
      </div>

      {/* Red accent bar */}
      <div className="absolute left-0 top-0 h-full w-1 bg-red-700" />

      {/* Content */}
      <div className="relative z-10 container mx-auto flex min-h-[90vh] flex-col justify-center px-4 pb-32 pt-16 lg:px-8">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <p className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-red-400">
            <span className="inline-block h-0.5 w-8 bg-red-500" />
            Welcome to NIIT
          </p>

          {/* Headline */}
          <h1 className="mb-6 text-4xl font-extrabold leading-[1.15] text-white sm:text-5xl md:text-6xl">
            We Design and Improve a{" "}
            <span className="text-red-500">Brighter Future</span> For Your
            Education
          </h1>

          {/* Sub-text */}
          <p className="mb-8 max-w-lg text-base leading-relaxed text-gray-300">
            Join thousands of graduates who have built thriving careers through
            world-class academic programmes, state-of-the-art facilities, and
            unparalleled mentorship at the National Institute and Information
            Technology.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <Button href="/admissions" variant="primary" size="lg">
              Apply Now
            </Button>
            <Button href="/about" variant="outline" size="lg">
              Read More
            </Button>
          </div>

          {/* Floating stats badges */}
          <div className="mt-10 flex flex-wrap gap-6">
            <div className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-3 backdrop-blur-sm border border-white/10">
              <GraduationCap size={20} className="text-red-400" />
              <div>
                <div className="text-xs font-bold text-white">500+</div>
                <div className="text-[10px] text-gray-400">Skilled Lecturers</div>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-3 backdrop-blur-sm border border-white/10">
              <Award size={20} className="text-red-400" />
              <div>
                <div className="text-xs font-bold text-white">Full Scholarship</div>
                <div className="text-[10px] text-gray-400">Available</div>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-3 backdrop-blur-sm border border-white/10">
              <Trophy size={20} className="text-red-400" />
              <div>
                <div className="text-xs font-bold text-white">92%</div>
                <div className="text-[10px] text-gray-400">Top Graduates</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats bar at bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <div className="bg-red-700">
          <div className="container mx-auto grid grid-cols-1 divide-y divide-red-600 px-4 py-0 md:grid-cols-3 md:divide-x md:divide-y-0 lg:px-8">
            {HERO_STATS.map((stat, i) => {
              const Icon = ICON_MAP[stat.icon as keyof typeof ICON_MAP] ?? GraduationCap;
              return (
                <div
                  key={i}
                  className="flex items-start gap-4 px-6 py-5"
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-white/20">
                    <Icon size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{stat.value}</h3>
                    <p className="mt-0.5 text-xs leading-relaxed text-red-100">
                      {stat.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
