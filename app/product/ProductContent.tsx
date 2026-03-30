"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, FileDown } from "lucide-react";
import type { ProductData } from "@/lib/types";

export default function ProductContent({ data }: { data: ProductData }) {
  return (
    <div className="min-h-screen px-6 md:px-12 pt-12 pb-24">
      {/* 헤더 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6"
      >
        <div>
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-[#c8ff00] mb-4">
            ✦ Product
          </p>
          <h1 className="font-black tracking-[-0.04em] leading-[0.9] text-[clamp(3rem,8vw,7rem)] text-[#f0f0f0]">
            OUR<br />PRODUCTS
          </h1>
        </div>
      </motion.div>

      {/* PDF 배너 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mb-10 border border-[#1e1e1e] p-8 flex flex-col md:flex-row items-center justify-between gap-6"
      >
        <div>
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-[#c8ff00] mb-2">SmartGeoKit ServiceLine</p>
          <p className="text-base font-semibold text-[#f0f0f0]">전체 제품 소개서를 PDF로 다운받으세요.</p>
          <p className="text-xs text-[#a1a1a1] mt-1">SmartGeoKit 8종 제품군 상세 사양 및 적용 사례 포함</p>
        </div>
        <a
          href="/SmartGeoKit_catalog.pdf"
          download
          className="group flex items-center gap-3 bg-[#c8ff00] text-[#080808] text-xs font-bold tracking-widest uppercase px-8 py-4 hover:bg-[#d4ff33] transition-colors shrink-0"
        >
          <FileDown size={15} className="group-hover:translate-y-0.5 transition-transform" />
          PDF 다운로드
          <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </motion.div>

      {/* 제품 목록 */}
      <div className="space-y-2">
        {data.products.map(({ id, name, tagline, desc, features, accent, cert }, i) => (
          <motion.div
            key={id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="sebit-card bg-[#080808] border border-[#1e1e1e] p-8 md:p-12"
          >
            <div className="flex flex-col md:flex-row md:items-start gap-8 md:gap-16">
              <div className="md:w-80 shrink-0">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-xs text-[#a1a1a1] tracking-widest">{id}</span>
                  {cert && (
                    <span
                      className="font-mono text-[10px] tracking-widest uppercase border px-2 py-0.5"
                      style={{ color: accent, borderColor: `${accent}50` }}
                    >
                      {cert}
                    </span>
                  )}
                </div>
                <h2 className="text-xl font-black tracking-tight mb-2 leading-snug" style={{ color: accent }}>
                  {name}
                </h2>
                <p className="text-sm text-[#b5b5b5]">{tagline}</p>
              </div>
              <div className="flex-1">
                <p className="text-sm text-[#ededed] leading-relaxed mb-8">{desc}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {features.map((f) => (
                    <div key={f} className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: accent }} />
                      <span className="text-xs text-[#b5b5b5]">{f}</span>
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
