import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-NG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatShortDate(dateStr: string): { day: string; month: string } {
  const d = new Date(dateStr);
  return {
    day: d.toLocaleDateString("en-NG", { day: "2-digit" }),
    month: d.toLocaleDateString("en-NG", { month: "short" }).toUpperCase(),
  };
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length).trimEnd() + "…";
}
