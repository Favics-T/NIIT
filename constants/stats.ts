
export interface StatItem {
  value: string;
  label: string;
  icon: string; 
}


export const HERO_STATS: StatItem[] = [
  {
    value: "Skilled Lecturers",
    label: "Experienced lecturers across all departments",
    icon: "GraduationCap",
  },
  {
    value: "Scholarship Facility",
    label: "Scholarship opportunities for eligible students",
    icon: "Award",
  },
  {
    value: "Top Graduates",
    label: "Graduates prepared for strong careers",
    icon: "Trophy",
  },
];


export const ABOUT_STATS: StatItem[] = [
  { value: "92%", label: "Graduation Rate", icon: "TrendingUp" },
  { value: "2.4M", label: "Alumni Worldwide", icon: "Users" },
  { value: "45 Years", label: "Years of Excellence", icon: "Calendar" },
];
