"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import MarqueeBar from "@/components/ui/MarqueeBar";
import SplitText from "@/components/ui/SplitText";
import ScrambleText from "@/components/ui/ScrambleText";

const SERVICES = [
  {
    num: "01",
    title: "2D GIS Engine",
    desc: "고성능 지리정보 엔진으로 공간 데이터를 정밀하게 시각화합니다.",
    href: "/product",
  },
  {
    num: "02",
    title: "CAD Compare",
    desc: "CAD 도면 변경사항을 자동으로 감지하고 비교 분석합니다.",
    href: "/product",
  },
  {
    num: "03",
    title: "CAD View",
    desc: "별도 설치 없이 브라우저에서 CAD 도면을 바로 열람합니다.",
    href: "/product",
  },
  {
    num: "04",
    title: "IT Consulting",
    desc: "기업 맞춤형 Smarter IT 솔루션 기획 및 구축을 지원합니다.",
    href: "/business",
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
  }),
};

export default function HomePage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative min-h-[100svh] flex flex-col justify-between px-6 md:px-12 pt-28 pb-12 overflow-hidden">
        {/* background grid */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(#1e1e1e 1px, transparent 1px), linear-gradient(90deg, #1e1e1e 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            opacity: 0.25,
          }}
        />

        {/* top label row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-between relative z-10"
        >
          <span className="font-mono text-[12px] tracking-[0.2em] uppercase text-[#d1d1d1]">
            Est. 2013 — Hwaseong, Korea
          </span>
          {/* Scramble effect on status label */}
          <span className="hidden sm:inline font-mono text-[12px] tracking-[0.2em] uppercase text-[#d1d1d1]">
            <ScrambleText text="IT SOLUTION PROVIDER" delay={0.5} />
          </span>
        </motion.div>

        {/* main headline */}
        <div className="relative z-10 my-auto py-12">
          {/* Scramble tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="font-mono text-xs tracking-[0.3em] uppercase text-[#c8ff00] mb-6"
          >
            ✦ <ScrambleText text="LEADER OF SMARTER WORLD" delay={0.3} />
          </motion.p>

          {/* 전체 화면 크기 → 정상 크기로 줄어드는 scale 효과 */}
          <motion.div
            initial={{ x: "100vw" }}
            animate={{ x: 0 }}
            transition={{ delay: 0.1, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="font-black leading-[0.9] tracking-[-0.04em] text-[clamp(4rem,12vw,11rem)]">
              <SplitText
                text="SEHYUN"
                delay={0.35}
                stagger={0.05}
                className="text-outline"
              />
            </h1>
            <h1 className="font-black leading-[0.9] tracking-[-0.04em] text-[clamp(4rem,12vw,11rem)]">
              <SplitText
                text="ICT"
                delay={0.65}
                stagger={0.06}
                className="text-[#c8ff00] text-neon"
              />
            </h1>
          </motion.div>

          {/* Sub description */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            className="mt-8 max-w-md text-sm leading-relaxed text-[#ededed]"
          >
            Smarter IT 기술 기반의 IT Solution Provider Group.
            <br />
            최적의 솔루션으로 고객 가치를 창출합니다.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15, duration: 0.6 }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <Link
              href="/business"
              className="group flex items-center gap-2 bg-[#c8ff00] text-[#080808] text-xs font-bold tracking-widest uppercase px-6 py-3 hover:bg-[#d4ff33] transition-colors"
            >
              사업 영역 보기
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
            <Link
              href="/contact"
              className="flex items-center gap-2 border border-[#1e1e1e] text-[#ddd9d9] text-xs font-medium tracking-widest uppercase px-6 py-3 hover:border-[#444] hover:text-[#f0f0f0] transition-colors"
            >
              Contact Us
            </Link>
          </motion.div>
        </div>

        {/* scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="flex items-center gap-3 relative z-10"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          >
            <ArrowDown size={14} className="text-[#d1d1d1]" />
          </motion.div>
          <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#d1d1d1]">
            Scroll
          </span>
        </motion.div>
      </section>

      {/* ── MARQUEE ──────────────────────────────────────── */}
      <MarqueeBar />

      {/* ── SERVICES ─────────────────────────────────────── */}
      <section className="px-6 md:px-12 py-24">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-14 flex items-end justify-between"
        >
          <motion.div variants={fadeUp} custom={0}>
            <h2 className="font-black tracking-[-0.03em] text-[clamp(2rem,5vw,4rem)] leading-tight">
              <span className="text-outline">Our</span>
              <br />
              <span className="text-[#c8ff00]">Products</span>
            </h2>
          </motion.div>
          <motion.div variants={fadeUp} custom={1}>
            <Link
              href="/product"
              className="group flex items-center gap-1 text-xs text-[#b5b5b5] hover:text-[#f0f0f0] transition-colors font-mono tracking-wider uppercase"
            >
              All Products
              <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#1e1e1e]">
          {SERVICES.map(({ num, title, desc, href }, i) => (
            <motion.div
              key={num}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              variants={fadeUp}
              custom={i}
            >
              <Link
                href={href}
                className="group flex flex-col justify-between gap-8 bg-[#080808] p-8 h-full hover:bg-[#0d0d0d] transition-colors"
              >
                <div className="flex items-start justify-between">
                  <span className="font-mono text-xs text-[#a1a1a1] tracking-widest">
                    {num}
                  </span>
                  <ArrowUpRight
                    size={14}
                    className="text-[#a1a1a1] group-hover:text-[#c8ff00] transition-colors"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold tracking-tight text-[#f0f0f0] mb-3 group-hover:text-[#c8ff00] transition-colors">
                    {title}
                  </h3>
                  <p className="text-sm text-[#b5b5b5] leading-relaxed">{desc}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── ABOUT STRIP ──────────────────────────────────── */}
      <section className="px-6 md:px-12 py-24 border-t border-[#1e1e1e]">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-[clamp(1.2rem,2.5vw,2rem)] font-semibold tracking-tight text-[#f0f0f0] leading-[1.4]"
          >
            세현ICT는 GIS·CAD 기반의 스마트 IT 솔루션을 통해
            <span className="text-[#c8ff00]"> 고객의 디지털 인프라를 혁신</span>
            하는 전문 기업입니다.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-8"
          >
            <Link
              href="/company"
              className="group inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] uppercase text-[#b5b5b5] hover:text-[#f0f0f0] transition-colors border-b border-[#1e1e1e] pb-1 hover:border-[#444]"
            >
              About Company
              <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── CONTACT CTA ──────────────────────────────────── */}
      <section className="px-6 md:px-12 py-24 border-t border-[#1e1e1e]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div>
            <p className="font-mono text-xs tracking-[0.25em] uppercase text-[#c8ff00] mb-4">
              ✦ Get in Touch
            </p>
            <h2 className="font-black tracking-[-0.03em] text-[clamp(2.5rem,6vw,5rem)] leading-[0.95]">
              <span className="text-outline">Let&apos;s Work</span>
              <br />
              <span className="text-[#f0f0f0]">Together</span>
            </h2>
          </div>
          <Link
            href="/contact"
            className="group flex-shrink-0 flex items-center gap-3 border border-[#1e1e1e] px-8 py-4 text-sm font-bold tracking-widest uppercase text-[#f0f0f0] hover:bg-[#c8ff00] hover:text-[#080808] hover:border-[#c8ff00] transition-all"
          >
            Contact Us
            <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </motion.div>

        {/* footer info */}
        <div className="mt-16 pt-8 border-t border-[#1e1e1e] flex flex-col md:flex-row justify-between gap-4">
          <span className="font-mono text-xs text-[#a1a1a1] tracking-wider">
            © 2015 SEHYUN ICT. All rights reserved.
          </span>
          <span className="font-mono text-xs text-[#a1a1a1] tracking-wider">
            Hwaseong, Gyeonggi — 070-4047-8955
          </span>
        </div>
      </section>
    </>
  );
}
