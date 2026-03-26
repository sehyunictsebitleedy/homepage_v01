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
                  className={`link-underline text-sm font-medium tracking-wider uppercase transition-colors ${
                    active ? "text-[#c8ff00]" : "text-[#ddd9d9] hover:text-[#f0f0f0]"
                  }`}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          {/* SEbit 브랜드 버튼 */}
          <a
            href="http://sebit.co.kr"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-1.5 relative group overflow-hidden border border-[#c8ff00]/40 px-3.5 py-1.5 text-[11px] font-mono font-bold tracking-[0.2em] uppercase text-[#c8ff00] hover:text-[#080808] transition-colors duration-300"
          >
            {/* 슬라이드 fill 효과 */}
            <span className="absolute inset-0 bg-[#c8ff00] translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]" />
            <span className="relative z-10">
              SE<span className="opacity-60">bit</span>
            </span>
          </a>

          <button
            className="md:hidden text-[#ddd9d9] hover:text-[#f0f0f0] transition-colors"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
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
            <li className="pt-2 border-t border-[#1e1e1e]">
              <a
                href="http://sebit.co.kr"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="inline-flex items-center gap-2 text-[11px] font-mono font-bold tracking-[0.2em] uppercase text-[#c8ff00]"
              >
                SEbit Brand Site
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
