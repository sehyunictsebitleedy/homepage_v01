"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { BusinessData } from "@/lib/types";

export default function BusinessContent({ data }: { data: BusinessData }) {
  return (
    <div className="min-h-screen px-6 md:px-12 pt-12 pb-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mb-20"
      >
        <p className="font-mono text-xs tracking-[0.3em] uppercase text-[#c8ff00] mb-4">
          ✦ 02 — Business
        </p>
        <h1 className="font-black tracking-[-0.04em] leading-[0.9] text-[clamp(3rem,8vw,7rem)] text-[#f0f0f0]">
          WHAT<br />WE DO
        </h1>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#1e1e1e]">
        {data.areas.map(({ num, title, desc, tags }, i) => (
          <motion.div
            key={num}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="bg-[#080808] p-6 md:p-8 flex flex-col gap-6"
          >
            <div className="flex items-start justify-between">
              <span className="font-mono text-xs text-[#a1a1a1] tracking-widest">{num}</span>
              <ArrowUpRight size={14} className="text-[#2a2a2a]" />
            </div>
            <div>
              <h3 className="text-xl font-bold tracking-tight text-[#f0f0f0] mb-3">{title}</h3>
              <p className="text-sm text-[#b5b5b5] leading-relaxed">{desc}</p>
            </div>
            <div className="flex flex-wrap gap-2 mt-auto">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[10px] tracking-widest uppercase border border-[#1e1e1e] text-[#d1d1d1] px-2 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
