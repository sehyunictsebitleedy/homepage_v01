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
          ✦ Business
        </p>
        <h1 className="font-black tracking-[-0.04em] leading-[0.9] text-[clamp(3rem,8vw,7rem)] text-[#f0f0f0]">
          WHAT<br />WE DO
        </h1>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#343434]">
        {data.areas.map(({ num, title, accent, desc, tags }, i) => (
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
              <h3 className="text-xl font-bold tracking-tight mb-3" style={{ color: accent }}>{title}</h3>
              <p className="text-sm text-[#b5b5b5] leading-relaxed">{desc}</p>
            </div>
            <div className="flex flex-wrap gap-2 mt-auto">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[10px] tracking-widest uppercase border border-[#343434] text-[#d1d1d1] px-2 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── MARKET ─────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mt-24 mb-12"
      >
        <p className="font-mono text-xs tracking-[0.3em] uppercase text-[#c8ff00] mb-4">✦ Market</p>
        <h2 className="font-black tracking-[-0.04em] leading-[0.9] text-[clamp(3rem,8vw,7rem)] text-[#f0f0f0]">
          MARKET<br />COVERAGE
        </h2>
        <p className="mt-4 text-sm text-[#b5b5b5] max-w-lg leading-relaxed">
          제조·금융 계열사를 아우르는 공간정보 솔루션 시장 영역입니다.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#1e1e1e]">
        {data.market.map(({ id, title, accent, services, targets, approach }, i) => (
          <motion.div
            key={id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="bg-[#080808] p-6 md:p-8 flex flex-col gap-5"
          >
            <div className="flex gap-6">
              {/* 왼쪽: 헤더 + 대상/추진방식 */}
              <div className="flex flex-col gap-5 flex-1">
                {/* 헤더 */}
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-bold tracking-tight leading-tight" style={{ color: accent }}>
                    {title}
                  </h3>
                </div>

                {/* 추진방식 */}
                <div className="mt-auto pt-4 border-t border-[#1e1e1e]">
                  <p className="font-mono text-[10px] tracking-widest uppercase text-[#555] mb-1.5">추진방식</p>
                  <div className="flex flex-wrap gap-1.5">
                    {approach.map((a) => (
                      <span key={a} className="font-mono text-[10px] tracking-widest text-[#080808] px-2 py-0.5" style={{ background: accent }}>
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* 오른쪽: 주요 서비스 */}
              <div className="w-56 shrink-0 pl-6 border-l border-[#1e1e1e]">
                <p className="font-mono text-[12px] tracking-widest uppercase text-[#555] mb-2">주요 서비스</p>
                <ul className="space-y-1">
                  {services.map((s) => (
                    <li key={s} className="text-xs text-[#b5b5b5] flex items-start gap-1.5">
                      <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ background: accent }} />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
