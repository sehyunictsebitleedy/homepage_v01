"use client";

import { motion } from "framer-motion";
import type { ProjectData } from "@/lib/types";

const TAG_COLOR: Record<string, string> = {
  GIS: "text-[#c8ff00] border-[#c8ff00]/30",
  CAD: "text-[#ff3cac] border-[#ff3cac]/30",
  IT: "text-[#ddd9d9] border-[#444]",
};

export default function ProjectContent({ data }: { data: ProjectData }) {
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
        {data.projects.map(({ title, client, year, tag }, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.07, duration: 0.5 }}
            className="group flex items-center justify-between py-6 hover:bg-[#0d0d0d] -mx-6 md:-mx-12 px-6 md:px-12 transition-colors cursor-default"
          >
            <div className="flex items-center gap-6 min-w-0">
              <span
                className={`font-mono text-[10px] tracking-widest uppercase border px-2 py-0.5 shrink-0 ${TAG_COLOR[tag] ?? "text-[#ddd9d9] border-[#444]"}`}
              >
                {tag}
              </span>
              <span className="text-sm md:text-base font-medium text-[#ddd9d9] group-hover:text-[#f0f0f0] transition-colors truncate">
                {title}
              </span>
            </div>
            <div className="flex items-center gap-6 shrink-0 ml-4">
              <span className="hidden md:block text-xs text-[#d1d1d1] font-mono">{client}</span>
              <span className="font-mono text-xs text-[#a1a1a1]">{year}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
