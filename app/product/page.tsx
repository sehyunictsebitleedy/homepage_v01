"use client";

import { motion } from "framer-motion";

const PRODUCTS = [
  {
    id: "01",
    name: "2D GIS Engine",
    tagline: "고성능 공간 데이터 시각화 엔진",
    desc: "독자 개발한 2D GIS 엔진으로 대용량 공간 데이터를 빠르고 정확하게 렌더링합니다. 다양한 좌표계를 지원하며 웹 환경에 최적화되어 있습니다.",
    features: ["레이어 기반 렌더링", "실시간 공간 쿼리", "다중 좌표계 지원", "대용량 데이터 처리"],
    accent: "#c8ff00",
  },
  {
    id: "02",
    name: "CAD Compare",
    tagline: "CAD 도면 변경사항 자동 감지",
    desc: "두 개의 CAD 도면을 자동으로 비교 분석하여 변경된 요소를 시각적으로 표시합니다. 설계 변경 이력을 체계적으로 관리할 수 있습니다.",
    features: ["자동 변경 감지", "시각적 차이 표시", "변경 이력 관리", "다양한 포맷 지원"],
    accent: "#ff3cac",
  },
  {
    id: "03",
    name: "CAD View",
    tagline: "브라우저 기반 CAD 도면 뷰어",
    desc: "별도의 소프트웨어 설치 없이 웹 브라우저에서 CAD 도면을 바로 열람합니다. 모바일 환경에서도 원활하게 동작합니다.",
    features: ["설치 불필요", "모바일 지원", "고속 렌더링", "협업 주석 기능"],
    accent: "#888",
  },
];

export default function ProductPage() {
  return (
    <div className="min-h-screen px-6 md:px-12 pt-12 pb-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mb-20"
      >
        <p className="font-mono text-xs tracking-[0.3em] uppercase text-[#c8ff00] mb-4">
          ✦ 04 — Product
        </p>
        <h1 className="font-black tracking-[-0.04em] leading-[0.9] text-[clamp(3rem,8vw,7rem)] text-[#f0f0f0]">
          OUR<br />PRODUCTS
        </h1>
      </motion.div>

      <div className="space-y-px bg-[#1e1e1e]">
        {PRODUCTS.map(({ id, name, tagline, desc, features, accent }, i) => (
          <motion.div
            key={id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="bg-[#080808] p-8 md:p-12"
          >
            <div className="flex flex-col md:flex-row md:items-start gap-8 md:gap-16">
              {/* Left */}
              <div className="md:w-80 shrink-0">
                <span className="font-mono text-xs text-[#333] tracking-widest block mb-4">{id}</span>
                <h2 className="text-2xl font-black tracking-tight mb-2" style={{ color: accent }}>
                  {name}
                </h2>
                <p className="text-sm text-[#555]">{tagline}</p>
              </div>

              {/* Right */}
              <div className="flex-1">
                <p className="text-sm text-[#666] leading-relaxed mb-8">{desc}</p>
                <div className="grid grid-cols-2 gap-2">
                  {features.map((f) => (
                    <div key={f} className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: accent }} />
                      <span className="text-xs text-[#555]">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
