"use client";

import { motion } from "framer-motion";
import { Phone, MapPin, Mail, Clock } from "lucide-react";
import type { ContactData } from "@/lib/types";

export default function ContactContent({ data }: { data: ContactData }) {
  const INFO = [
    { icon: Phone, label: "Tel", value: data.tel },
    { icon: Mail, label: "Email", value: data.email },
    { icon: MapPin, label: "Address", value: data.address },
    { icon: Clock, label: "Hours", value: "평일 09:00 – 18:00" },
  ];

  return (
    <div className="min-h-screen px-6 md:px-12 pt-12 pb-24">
      {/* 헤더 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mb-16"
      >
        <p className="font-mono text-xs tracking-[0.3em] uppercase text-[#c8ff00] mb-4">
          ✦ Contact
        </p>
        <h1 className="font-black tracking-[-0.04em] leading-[0.9] text-[clamp(3rem,8vw,7rem)] text-[#f0f0f0]">
          GET IN<br />TOUCH
        </h1>
      </motion.div>

      {/* 지도 + Info — 5:5 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.7 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-[#343434] mb-24"
      >
        {/* 왼쪽: 지도 */}
        <div className="relative" style={{ minHeight: 320 }}>
          <iframe
            src={data.mapEmbedUrl || `https://www.openstreetmap.org/export/embed.html?bbox=127.0821%2C37.2047%2C127.1021%2C37.2147&layer=mapnik&marker=37.2097454%2C127.0921059`}
            className="w-full h-full border-0 absolute inset-0"
            style={{ minHeight: 320 }}
            loading="lazy"
            allowFullScreen
          />
        </div>

        {/* 오른쪽: Info */}
        <div className="border-t lg:border-t-0 lg:border-l border-[#343434] p-8 flex flex-col justify-between gap-6">
          <div>
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#c8ff00] mb-6">— Location &amp; Info</p>
            <div className="divide-y divide-[#343434]">
              {INFO.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-4 py-5">
                  <div className="w-7 h-7 border border-[#343434] flex items-center justify-center shrink-0 mt-0.5">
                    <Icon size={12} className="text-[#c8ff00]" />
                  </div>
                  <div>
                    <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#666] mb-1">{label}</p>
                    <p className="text-sm text-[#ddd9d9] leading-relaxed">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <a
              href={`https://map.kakao.com/link/map/${encodeURIComponent(data.mapQuery || data.address)},37.2097454,127.0921059`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[10px] tracking-widest uppercase text-[#c8ff00] hover:text-[#d4ff33] transition-colors border border-[#343434] px-3 py-1.5 hover:border-[#c8ff00]"
            >
              카카오맵 ↗
            </a>
            <a
              href={`https://map.naver.com/p/search/${encodeURIComponent(data.mapQuery || data.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[10px] tracking-widest uppercase text-[#c8ff00] hover:text-[#d4ff33] transition-colors border border-[#343434] px-3 py-1.5 hover:border-[#c8ff00]"
            >
              네이버지도 ↗
            </a>
          </div>
        </div>
      </motion.div>

      {/* 상담 접수 */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.7 }}
      >
        <div className="mb-10">
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-[#c8ff00] mb-4">✦ Consultation</p>
          <h2 className="font-black tracking-[-0.03em] leading-[0.95] text-[clamp(2.5rem,6vw,5rem)] text-[#f0f0f0]">
            <span className="text-outline">PROJECT</span> REQUEST<br />
            <span className="text-[#c8ff00]">FORM</span>
          </h2>
          <p className="mt-4 text-sm text-[#b5b5b5] max-w-lg leading-relaxed">
            GIS·CAD, 공공데이터, AI 솔루션 등 IT 프로젝트 전반에 대한 상담을 접수해 드립니다.<br />
            접수 후 1영업일 내 담당자가 연락드립니다.
          </p>
        </div>

        <form
          className="border border-[#343434]"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* 이름 */}
            <div className="border-b border-r-0 md:border-r border-[#343434] p-6">
              <label className="block font-mono text-[10px] tracking-[0.25em] uppercase text-[#aaa] mb-3">담당자명 *</label>
              <input
                type="text"
                className="w-full bg-transparent text-[#f0f0f0] text-base outline-none placeholder:text-[#333] border-b border-[#343434] pb-2 focus:border-[#c8ff00] transition-colors"
                placeholder="홍길동"
              />
            </div>
            {/* 회사 */}
            <div className="border-b border-[#343434] p-6">
              <label className="block font-mono text-[10px] tracking-[0.25em] uppercase text-[#aaa] mb-3">회사명 *</label>
              <input
                type="text"
                className="w-full bg-transparent text-[#f0f0f0] text-base outline-none placeholder:text-[#333] border-b border-[#343434] pb-2 focus:border-[#c8ff00] transition-colors"
                placeholder="(주)회사명"
              />
            </div>
            {/* 연락처 */}
            <div className="border-b border-r-0 md:border-r border-[#343434] p-6">
              <label className="block font-mono text-[10px] tracking-[0.25em] uppercase text-[#aaa] mb-3">연락처 *</label>
              <input
                type="tel"
                className="w-full bg-transparent text-[#f0f0f0] text-base outline-none placeholder:text-[#333] border-b border-[#343434] pb-2 focus:border-[#c8ff00] transition-colors"
                placeholder="010-0000-0000"
              />
            </div>
            {/* 이메일 */}
            <div className="border-b border-[#343434] p-6">
              <label className="block font-mono text-[10px] tracking-[0.25em] uppercase text-[#aaa] mb-3">이메일</label>
              <input
                type="email"
                className="w-full bg-transparent text-[#f0f0f0] text-base outline-none placeholder:text-[#333] border-b border-[#343434] pb-2 focus:border-[#c8ff00] transition-colors"
                placeholder="email@example.com"
              />
            </div>

            {/* 분야 */}
            <div className="border-b border-[#343434] p-6 md:col-span-2">
              <label className="block font-mono text-[10px] tracking-[0.25em] uppercase text-[#aaa] mb-4">상담 분야</label>
              <div className="flex flex-wrap gap-2">
                {["GIS / CAD", "공공데이터", "AI 솔루션", "모바일 앱", "웹 시스템", "기타"].map((tag) => (
                  <label key={tag} className="cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <span className="inline-block font-mono text-[11px] tracking-widest uppercase border border-[#343434] px-3 py-1.5 text-[#666] peer-checked:border-[#c8ff00] peer-checked:text-[#c8ff00] transition-colors hover:border-[#444] hover:text-[#aaa]">
                      {tag}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* 문의 내용 */}
            <div className="border-b border-[#343434] p-6 md:col-span-2">
              <label className="block font-mono text-[10px] tracking-[0.25em] uppercase text-[#aaa] mb-3">문의 내용 *</label>
              <textarea
                rows={6}
                className="w-full bg-transparent text-[#f0f0f0] text-sm outline-none placeholder:text-[#333] resize-none focus:placeholder:text-[#444] transition-colors leading-relaxed"
                placeholder="프로젝트 개요, 요구사항, 예산 규모, 일정 등을 자유롭게 적어주세요."
              />
            </div>

            {/* 제출 */}
            <div className="p-6 md:col-span-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p className="font-mono text-[10px] tracking-wider text-[#444]">
                * 표시 항목은 필수 입력입니다
              </p>
              <button
                type="submit"
                className="group flex items-center gap-3 bg-[#c8ff00] text-[#080808] text-xs font-black tracking-[0.2em] uppercase px-10 py-4 hover:bg-[#d4ff33] transition-colors"
              >
                상담 접수
                <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
              </button>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
