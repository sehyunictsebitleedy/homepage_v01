"use client";

import { motion } from "framer-motion";

const HISTORY = [
  { year: "2015", event: "세현ICT 설립" },
  { year: "2017", event: "2D GIS Engine 1.0 출시" },
  { year: "2019", event: "CAD View / CAD Compare 솔루션 출시" },
  { year: "2021", event: "경기도 화성시 금강펜테리움 IT타워 이전" },
  { year: "2024", event: "홈페이지 리뉴얼 및 서비스 고도화" },
];

export default function CompanyPage() {
  return (
    <div className="min-h-screen px-6 md:px-12 pt-12 pb-24">
      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mb-20"
      >
        <p className="font-mono text-xs tracking-[0.3em] uppercase text-[#c8ff00] mb-4">
          ✦ 01 — Company
        </p>
        <h1 className="font-black tracking-[-0.04em] leading-[0.9] text-[clamp(3rem,8vw,7rem)] text-[#f0f0f0]">
          WHO<br />WE ARE
        </h1>
      </motion.div>

      {/* Mission */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.7 }}
        className="mb-24 max-w-2xl"
      >
        <p className="text-[clamp(1rem,2vw,1.25rem)] leading-[1.8] text-[#ededed]">
          세현ICT는{" "}
          <span className="text-[#f0f0f0] font-medium">
            Smarter IT 기술 기반의 IT Solution Provider Group
          </span>
          으로, GIS·CAD 솔루션 전문화를 통해 고객이 원하는 최적의 솔루션을
          제공하여 고객 가치 창출에 집중하는 기업입니다.
        </p>
      </motion.div>

      {/* Values */}
      <div className="mb-24 grid grid-cols-1 md:grid-cols-3 gap-px bg-[#1e1e1e]">
        {[
          { label: "Mission", text: "Leader of Smarter World" },
          { label: "Vision", text: "최적의 IT 솔루션으로 고객 가치 창출" },
          { label: "Core Value", text: "기술 혁신 · 신뢰 · 고객 중심" },
        ].map(({ label, text }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
            className="bg-[#080808] p-6 md:p-8"
          >
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#d1d1d1] mb-4">
              {label}
            </p>
            <p className="text-lg font-semibold text-[#f0f0f0] leading-tight">{text}</p>
          </motion.div>
        ))}
      </div>

      {/* History */}
      <div>
        <p className="font-mono text-xs tracking-[0.25em] uppercase text-[#d1d1d1] mb-10">
          — Company History
        </p>
        <div className="space-y-0 divide-y divide-[#1e1e1e]">
          {HISTORY.map(({ year, event }, i) => (
            <motion.div
              key={year}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="flex items-center gap-4 md:gap-8 py-5"
            >
              <span className="font-mono text-xs tracking-widest text-[#c8ff00] w-12 shrink-0">
                {year}
              </span>
              <span className="text-sm text-[#ddd9d9]">{event}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
