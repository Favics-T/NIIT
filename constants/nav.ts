
export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export const NAV_LINKS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Academics",
    href: "/academics",
    children: [
      { label: "All Programs", href: "/academics" },
      { label: "Engineering", href: "/academics/engineering" },
      { label: "Computer Science", href: "/academics/computer-science" },
      { label: "Business Administration", href: "/academics/business-administration" },
      { label: "Information Technology", href: "/academics/information-technology" },
    ],
  },
  { label: "Faculties", href: "/faculties" },
  { label: "Campus Life", href: "/campus-life" },
  { label: "Blog", href: "/news" },
  {
    label: "Pages",
    href: "#",
    children: [
      { label: "Admissions", href: "/admissions" },
      { label: "Contact", href: "/contact" },
    ],
  },
];
