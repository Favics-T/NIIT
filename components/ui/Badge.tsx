import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type BadgeVariant = "red" | "dark" | "gray" | "white";

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variants: Record<BadgeVariant, string> = {
  red: "bg-red-700 text-white",
  dark: "bg-[#1A1A2E] text-white",
  gray: "bg-gray-100 text-gray-700",
  white: "bg-white text-red-700",
};

export function Badge({ children, variant = "red", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded px-3 py-1 text-xs font-semibold uppercase tracking-widest",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
