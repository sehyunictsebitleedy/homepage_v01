"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, FileDown, X, ImageIcon } from "lucide-react";
import type { ProductData } from "@/lib/types";
import TiltCard from "@/components/ui/TiltCard";

export default function ProductContent({ data }: { data: ProductData }) {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

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
        className="mb-10 border border-[#343434] p-8 flex flex-col md:flex-row items-center justify-between gap-6"
      >
        <div>
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-[#c8ff00] mb-2">SmartGeoKit ServiceLine</p>
          <p className="text-base font-semibold text-[#f0f0f0]">전체 제품 소개서를 PDF로 다운받으세요.</p>
          <p className="text-xs text-[#a1a1a1] mt-1">SmartGeoKit 8종 제품군 상세 사양 및 적용 사례 포함</p>
        </div>
        <a
          href="/download/2025_Brochure.pdf"
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
        {data.products.map(({ id, name, tagline, desc, features, accent, cert, imageUrl }, i) => (
          <motion.div
            key={id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <TiltCard className="sebit-card bg-[#080808] border border-[#343434] p-8 md:p-12">
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
                  <p className="text-sm text-[#b5b5b5] mb-6">{tagline}</p>
                  {imageUrl && (
                    <button
                      onClick={() => setLightboxSrc(imageUrl)}
                      className="relative z-10 flex items-center gap-2 text-xs font-mono tracking-widest uppercase border border-[#343434] text-[#a1a1a1] px-4 py-2 hover:border-[#c8ff00] hover:text-[#c8ff00] transition-colors"
                    >
                      <ImageIcon size={12} />
                      제품설명
                    </button>
                  )}
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
            </TiltCard>
          </motion.div>
        ))}
      </div>

      {/* 라이트박스 */}
      <AnimatePresence>
        {lightboxSrc && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[300] bg-black/90 flex items-center justify-center p-4 md:p-12"
            onClick={() => setLightboxSrc(null)}
          >
            <button
              className="absolute top-6 right-6 text-[#a1a1a1] hover:text-white transition-colors"
              onClick={() => setLightboxSrc(null)}
            >
              <X size={28} />
            </button>
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={lightboxSrc}
                alt="제품 설명"
                width={1200}
                height={800}
                className="w-full h-auto max-h-[85vh] object-contain"
                unoptimized
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
