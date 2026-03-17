"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const AREAS = [
  {
    num: "01",
    title: "GIS 솔루션",
    desc: "2D GIS 엔진을 기반으로 공간 데이터를 효율적으로 처리하고 시각화합니다. 지자체 및 공공기관 맞춤형 GIS 시스템 구축을 지원합니다.",
    tags: ["GIS Engine", "공간분석", "지도시각화"],
  },
  {
    num: "02",
    title: "CAD 솔루션",
    desc: "CAD View·Compare 솔루션으로 도면 관리 프로세스를 자동화합니다. 설계 변경 이력 추적 및 협업 환경을 제공합니다.",
    tags: ["CAD View", "CAD Compare", "도면관리"],
  },
  {
    num: "03",
    title: "IT Consulting",
    desc: "기업 환경을 분석하여 최적의 IT 인프라 전략을 수립합니다. 도입부터 운영까지 전 과정을 지원합니다.",
    tags: ["IT전략", "인프라", "디지털전환"],
  },
  {
    num: "04",
    title: "시스템 구축",
    desc: "Smarter IT 기반의 맞춤형 시스템을 기획·개발·운영합니다. 공공·민간 프로젝트 경험을 바탕으로 안정적인 시스템을 구축합니다.",
    tags: ["SI", "공공시스템", "유지보수"],
  },
];

export default function BusinessPage() {
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
        {AREAS.map(({ num, title, desc, tags }, i) => (
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
              <h3 className="text-xl font-bold tracking-tight text-[#f0f0f0] mb-3">
                {title}
              </h3>
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
