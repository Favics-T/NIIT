// src/components/home/AdmissionSteps.tsx
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StepCard } from "@/components/ui/StepCard";
import { Button } from "@/components/ui/Button";
import { ADMISSION_STEPS } from "@/constants/steps";

export function AdmissionSteps() {
  return (
    <section className="bg-gray-50 py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left: heading + CTA */}
          <div className="flex flex-col justify-center">
            <SectionHeading
              eyebrow="Admissions"
              title={
                <>
                  Your Journey Starts Here,{" "}
                  <span className="text-red-700">
                    Steps to Your Academic Success
                  </span>
                </>
              }
              description="Follow these simple steps to begin your academic journey at the National Institute and Information Technology."
            />
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/admissions" variant="primary" size="md">
                Apply Now
              </Button>
              <Button href="/about" variant="ghost" size="md">
                Learn More
              </Button>
            </div>
          </div>

          {/* Right: steps */}
          <div className="relative">
            {/* Decorative vertical line behind steps */}
            <div className="absolute left-5 top-0 h-full w-px bg-red-100" />
            <div className="space-y-0">
              {ADMISSION_STEPS.map((step, i) => (
                <StepCard
                  key={step.number}
                  number={step.number}
                  title={step.title}
                  description={step.description}
                  isLast={i === ADMISSION_STEPS.length - 1}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
