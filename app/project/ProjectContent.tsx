"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { ProjectData } from "@/lib/types";
import CountUp from "@/components/ui/CountUp";

const TAG_COLOR: Record<string, string> = {
  GIS:    "text-[#c8ff00] border-[#c8ff00]/30",
  CAD:    "text-[#ff3cac] border-[#ff3cac]/30",
  Mobile: "text-[#00f0ff] border-[#00f0ff]/30",
  SI:     "text-[#ddd9d9] border-[#444]",
  IT:     "text-[#ddd9d9] border-[#444]",
  유지보수: "text-[#a1a1a1] border-[#333]",
  인증:   "text-[#c8ff00] border-[#c8ff00]/30",
  특허:   "text-[#ff3cac] border-[#ff3cac]/30",
  인프라: "text-[#ddd9d9] border-[#444]",
};

const CURRENT_YEAR = "2025";

export default function ProjectContent({ data }: { data: ProjectData }) {
  const [activeYear, setActiveYear] = useState(data.years[0]?.year ?? "");
  const [openYears, setOpenYears] = useState<Set<string>>(
    new Set(data.years.filter((y) => y.year === CURRENT_YEAR).map((y) => y.year))
  );
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const toggleYear = (year: string) => {
    if (year === CURRENT_YEAR) return;
    setOpenYears((prev) => {
      const next = new Set(prev);
      next.has(year) ? next.delete(year) : next.add(year);
      return next;
    });
  };

  const scrollToYear = (year: string) => {
    setActiveYear(year);
    const el = sectionRefs.current[year];
    if (el) {
      const offset = 100;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen px-6 md:px-12 pt-12 pb-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mb-12"
      >
        <p className="font-mono text-xs tracking-[0.3em] uppercase text-[#c8ff00] mb-4">
          ✦ Project
        </p>
        <h1 className="font-black tracking-[-0.04em] leading-[0.9] text-[clamp(3rem,8vw,7rem)] text-[#f0f0f0]">
          OUR<br />WORK
        </h1>
      </motion.div>

      {/* 연도 탭 */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="sticky top-16 z-10 bg-[#080808] border-b border-[#1e1e1e] -mx-6 md:-mx-12 px-6 md:px-12 mb-12"
      >
        <div className="flex gap-0 overflow-x-auto scrollbar-none">
          {data.years.map(({ year }) => (
            <button
              key={year}
              onClick={() => scrollToYear(year)}
              className={`relative shrink-0 font-mono text-xs tracking-widest px-4 py-3 transition-colors ${
                activeYear === year
                  ? "text-[#c8ff00]"
                  : "text-[#555] hover:text-[#a1a1a1]"
              }`}
            >
              {year}
              {activeYear === year && (
                <motion.div
                  layoutId="tab-indicator"
                  className="absolute bottom-0 left-0 right-0 h-px bg-[#c8ff00]"
                />
              )}
            </button>
          ))}
        </div>
      </motion.div>

      {/* 연도별 섹션 */}
      <div className="space-y-12">
        {data.years.map(({ year, projects }, yi) => (
          <div
            key={year}
            ref={(el) => { sectionRefs.current[year] = el; }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: yi * 0.04, duration: 0.6 }}
            >
              {/* 연도 헤더 */}
              <button
                onClick={() => toggleYear(year)}
                className="w-full flex items-center gap-4 mb-4 group"
                style={{ cursor: year === CURRENT_YEAR ? "default" : "pointer" }}
              >
                <span className="font-black text-[clamp(1.5rem,4vw,3rem)] tracking-[-0.04em] text-[#c8ff00]">
                  {year}
                </span>
                <div className="flex-1 h-px bg-[#1e1e1e]" />
                <CountUp
                  to={projects.length}
                  suffix=" PJT"
                  duration={0.9}
                  className="font-mono text-[10px] text-[#666] tracking-widest"
                />
                {year !== CURRENT_YEAR && (
                  <ChevronDown
                    size={14}
                    className={`text-[#555] group-hover:text-[#a1a1a1] transition-all shrink-0 ${openYears.has(year) ? "rotate-180" : ""}`}
                  />
                )}
              </button>

              {/* 프로젝트 목록 */}
              <AnimatePresence initial={false}>
                {openYears.has(year) && (
                  <motion.div
                    key="projects"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-px">
                      {projects.map(({ title, client, tag }, i) => (
                        <div
                          key={i}
                          className="flex items-start justify-between gap-4 py-4 px-4 bg-[#080808] hover:bg-[#0d0d0d] transition-colors cursor-default"
                        >
                          <div className="flex items-start gap-3 min-w-0">
                            <span
                              className={`font-mono text-[10px] tracking-widest uppercase border px-2 py-0.5 shrink-0 mt-0.5 ${TAG_COLOR[tag] ?? "text-[#ddd9d9] border-[#444]"}`}
                            >
                              {tag}
                            </span>
                            <span className="text-sm font-medium text-[#ddd9d9] leading-snug">
                              {title}
                            </span>
                          </div>
                          <span className="hidden md:block text-xs text-[#a1a1a1] font-mono shrink-0">
                            {client}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}
