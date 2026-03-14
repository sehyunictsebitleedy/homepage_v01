"use client";

import { motion } from "framer-motion";

const PROJECTS = [
  { title: "지자체 GIS 통합 플랫폼 구축", client: "경기도 A시", year: "2023", tag: "GIS" },
  { title: "CAD 도면 관리 시스템 개발", client: "건설사 B사", year: "2023", tag: "CAD" },
  { title: "공간정보 시스템 고도화", client: "공공기관 C", year: "2022", tag: "GIS" },
  { title: "CAD Compare 도입 컨설팅", client: "엔지니어링 D사", year: "2022", tag: "CAD" },
  { title: "IT 인프라 전환 프로젝트", client: "제조사 E사", year: "2021", tag: "IT" },
  { title: "GIS 기반 시설물 관리 시스템", client: "지자체 F", year: "2021", tag: "GIS" },
];

const TAG_COLOR: Record<string, string> = {
  GIS: "text-[#c8ff00] border-[#c8ff00]/30",
  CAD: "text-[#ff3cac] border-[#ff3cac]/30",
  IT:  "text-[#888] border-[#444]",
};

export default function ProjectPage() {
  return (
    <div className="min-h-screen px-6 md:px-12 pt-12 pb-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mb-20"
      >
        <p className="font-mono text-xs tracking-[0.3em] uppercase text-[#c8ff00] mb-4">
          ✦ 03 — Project
        </p>
        <h1 className="font-black tracking-[-0.04em] leading-[0.9] text-[clamp(3rem,8vw,7rem)] text-[#f0f0f0]">
          OUR<br />WORK
        </h1>
      </motion.div>

      <div className="space-y-0 divide-y divide-[#1e1e1e]">
        {PROJECTS.map(({ title, client, year, tag }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.07, duration: 0.5 }}
            className="group flex items-center justify-between py-6 hover:bg-[#0d0d0d] -mx-6 md:-mx-12 px-6 md:px-12 transition-colors cursor-default"
          >
            <div className="flex items-center gap-6 min-w-0">
              <span
                className={`font-mono text-[10px] tracking-widest uppercase border px-2 py-0.5 shrink-0 ${TAG_COLOR[tag]}`}
              >
                {tag}
              </span>
              <span className="text-sm md:text-base font-medium text-[#888] group-hover:text-[#f0f0f0] transition-colors truncate">
                {title}
              </span>
            </div>
            <div className="flex items-center gap-6 shrink-0 ml-4">
              <span className="hidden md:block text-xs text-[#444] font-mono">{client}</span>
              <span className="font-mono text-xs text-[#333]">{year}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
