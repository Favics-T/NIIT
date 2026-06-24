"use client";
import { NAV_LINKS } from "@/constants/nav";
import { CONTACT, SITE_SHORT_NAME } from "@/constants/site";
import { Menu, MapPin, Phone, Mail, Clock, ChevronDown, GraduationCap } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Top info bar */}
      {/* <div className="hidden bg-[#1A1A2E] py-2 text-xs text-gray-300 md:block">
        <div className="container mx-auto flex items-center justify-between px-4 lg:px-8">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <MapPin size={12} className="text-red-500" />
              {CONTACT.address}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={12} className="text-red-500" />
              {CONTACT.hours}
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a href={`tel:${CONTACT.phone}`} className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Phone size={12} className="text-red-500" />
              {CONTACT.phone}
            </a>
            <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Mail size={12} className="text-red-500" />
              {CONTACT.email}
            </a>
          </div>
        </div>
      </div> */}

      {/* Main nav */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white shadow-lg" : "bg-white"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between px-4 py-4 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-700 shadow-md shadow-red-700/30 transition-transform group-hover:scale-105">
              <GraduationCap size={22} className="text-white" />
            </div>
            <div className="leading-tight">
              <div className="text-base font-extrabold text-[#1A1A2E] tracking-tight">
                {SITE_SHORT_NAME}
              </div>
              <div className="text-[10px] font-medium text-gray-500 tracking-wide">
                National Institute & IT
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((item) =>
              item.children ? (
                <div key={item.label} className="group relative">
                  <button className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-semibold text-gray-700 transition-colors hover:text-red-700">
                    {item.label}
                    <ChevronDown size={14} className="transition-transform group-hover:rotate-180" />
                  </button>
                  {/* Dropdown */}
                  <div className="invisible absolute left-0 top-full z-50 mt-1 w-52 rounded-xl border border-gray-100 bg-white py-2 opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:opacity-100">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2.5 text-sm text-gray-600 transition-colors hover:bg-red-50 hover:text-red-700"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-md px-3 py-2 text-sm font-semibold text-gray-700 transition-colors hover:text-red-700"
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="hidden rounded-lg bg-red-700 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-red-700/20 transition-all hover:bg-red-800 hover:shadow-lg lg:block"
            >
              Contact Us
            </Link>
            <button
              onClick={() => setMobileOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-700 transition hover:bg-gray-50 lg:hidden"
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
