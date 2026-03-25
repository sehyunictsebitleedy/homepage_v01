"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import type { NavItem } from "@/lib/types";

export default function NavbarContent({
  items,
  logoText,
}: {
  items: NavItem[];
  logoText: string;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const enabled = items.filter((i) => i.enabled);
  const logo = logoText.replace("ICT", "");

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[#1e1e1e] bg-[#080808]/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link
          href="/"
          className="font-mono text-sm font-bold tracking-[0.2em] uppercase text-[#f0f0f0] hover:text-[#c8ff00] transition-colors"
        >
          {logo}<span className="text-[#c8ff00]">ICT</span>
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {enabled.map(({ label, href }) => {
            const active = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`text-sm font-medium tracking-wider uppercase transition-colors ${
                    active ? "text-[#c8ff00]" : "text-[#ddd9d9] hover:text-[#f0f0f0]"
                  }`}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        <button
          className="md:hidden text-[#ddd9d9] hover:text-[#f0f0f0] transition-colors"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-[#1e1e1e] bg-[#080808]">
          <ul className="flex flex-col px-6 py-4 gap-4">
            {enabled.map(({ label, href }) => {
              const active = pathname === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setOpen(false)}
                    className={`block text-sm font-medium tracking-wider uppercase transition-colors ${
                      active ? "text-[#c8ff00]" : "text-[#ddd9d9] hover:text-[#f0f0f0]"
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
}
