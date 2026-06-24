import { CONTACT, SITE_NAME, SITE_SHORT_NAME, SOCIAL } from "@/constants/site";
import { NAV_LINKS } from "@/constants/nav";
import {
  GraduationCap,
  MapPin,
  Phone,
  Mail,
  Share2,
  MessageCircle,
  Camera,
  Briefcase,
  PlayCircle,
} from "lucide-react";
import Link from "next/link";

const ACADEMIC_LINKS = [
  { label: "Engineering", href: "/academics/engineering" },
  { label: "Computer Science", href: "/academics/computer-science" },
  { label: "Business Admin", href: "/academics/business-administration" },
  { label: "Information Technology", href: "/academics/information-technology" },
  { label: "View All Programs", href: "/academics" },
];

const QUICK_LINKS = [
  { label: "About NIIT", href: "/about" },
  { label: "Admissions", href: "/admissions" },
  { label: "Campus Life", href: "/campus-life" },
  { label: "News & Events", href: "/news" },
  { label: "Contact Us", href: "/contact" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0D0D1A] text-gray-300">
      {/* Main footer */}
      <div className="container mx-auto px-4 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div>
            <Link href="/" className="mb-5 flex items-center gap-2.5 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-700">
                <GraduationCap size={22} className="text-white" />
              </div>
              <div className="leading-tight">
                <div className="text-base font-extrabold text-white">{SITE_SHORT_NAME}</div>
                <div className="text-[10px] text-gray-400">National Institute & IT</div>
              </div>
            </Link>
            <p className="mb-6 text-sm leading-relaxed text-gray-400">
              {SITE_NAME} is a leading institution committed to academic excellence,
              innovation, and producing industry-ready graduates since 1980.
            </p>
            {/* Social */}
            <div className="flex items-center gap-3">
              {[
                { icon: Share2, href: SOCIAL.facebook, label: "Facebook" },
                { icon: MessageCircle, href: SOCIAL.twitter, label: "Twitter" },
                { icon: Camera, href: SOCIAL.instagram, label: "Instagram" },
                { icon: Briefcase, href: SOCIAL.linkedin, label: "LinkedIn" },
                { icon: PlayCircle, href: SOCIAL.youtube, label: "YouTube" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-gray-400 transition hover:bg-red-700 hover:text-white"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 text-sm font-bold uppercase tracking-widest text-white">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-red-400"
                  >
                    → {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Academics */}
          <div>
            <h3 className="mb-5 text-sm font-bold uppercase tracking-widest text-white">
              Academics
            </h3>
            <ul className="space-y-3">
              {ACADEMIC_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-red-400"
                  >
                    → {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-5 text-sm font-bold uppercase tracking-widest text-white">
              Contact
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <MapPin size={16} className="mt-0.5 flex-shrink-0 text-red-500" />
                {CONTACT.address}
              </li>
              <li>
                <a
                  href={`tel:${CONTACT.phone}`}
                  className="flex items-center gap-3 text-sm text-gray-400 transition-colors hover:text-red-400"
                >
                  <Phone size={16} className="flex-shrink-0 text-red-500" />
                  {CONTACT.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="flex items-center gap-3 text-sm text-gray-400 transition-colors hover:text-red-400"
                >
                  <Mail size={16} className="flex-shrink-0 text-red-500" />
                  {CONTACT.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="container mx-auto flex flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-gray-500 md:flex-row lg:px-8">
          <p>
            © {currentYear} {SITE_NAME}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gray-300 transition-colors">Terms of Use</Link>
            <Link href="/sitemap.xml" className="hover:text-gray-300 transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
