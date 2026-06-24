import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-red-600">
          <span className="inline-block h-0.5 w-8 bg-red-600" />
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "text-3xl font-extrabold leading-tight md:text-4xl",
          light ? "text-white" : "text-[#1A1A2E]"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed",
            light ? "text-gray-300" : "text-gray-500"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
