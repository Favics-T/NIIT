// src/constants/stats.ts
export interface StatItem {
  value: string;
  label: string;
  icon: string; // Lucide icon name
}

/** Hero stats bar — three feature pillars */
export const HERO_STATS: StatItem[] = [
  {
    value: "Skilled Lecturers",
    label:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor.",
    icon: "GraduationCap",
  },
  {
    value: "Scholarship Facility",
    label:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor.",
    icon: "Award",
  },
  {
    value: "Top Graduates",
    label:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor.",
    icon: "Trophy",
  },
];

/** About-section numerical highlights */
export const ABOUT_STATS: StatItem[] = [
  { value: "92%", label: "Graduation Rate", icon: "TrendingUp" },
  { value: "2.4M", label: "Alumni Worldwide", icon: "Users" },
  { value: "45 Years", label: "Years of Excellence", icon: "Calendar" },
];
