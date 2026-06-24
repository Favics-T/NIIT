"use client";
// src/components/layout/MobileMenu.tsx
import { NAV_LINKS } from "@/constants/nav";
import { SITE_SHORT_NAME } from "@/constants/site";
import { X, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [expanded, setExpanded] = useState<string | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer */}
      <nav className="relative ml-auto flex h-full w-80 flex-col bg-[#1A1A2E] shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <span className="text-lg font-extrabold tracking-wide text-white">
            {SITE_SHORT_NAME}
          </span>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        {/* Links */}
        <ul className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
          {NAV_LINKS.map((item) => (
            <li key={item.label}>
              {item.children ? (
                <div>
                  <button
                    onClick={() =>
                      setExpanded(expanded === item.label ? null : item.label)
                    }
                    className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-sm font-semibold text-gray-200 hover:bg-white/10"
                  >
                    {item.label}
                    {expanded === item.label ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    )}
                  </button>
                  {expanded === item.label && (
                    <ul className="ml-4 mt-1 space-y-1 border-l border-white/10 pl-4">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            onClick={onClose}
                            className="block rounded px-3 py-2 text-sm text-gray-400 hover:text-red-400"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="block rounded-lg px-4 py-3 text-sm font-semibold text-gray-200 hover:bg-white/10"
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* Footer CTA */}
        <div className="border-t border-white/10 px-6 py-5">
          <Link
            href="/contact"
            onClick={onClose}
            className="block w-full rounded-lg bg-red-700 px-6 py-3 text-center text-sm font-bold text-white transition hover:bg-red-800"
          >
            Contact Us
          </Link>
        </div>
      </nav>
    </div>
  );
}
