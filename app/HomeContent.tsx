"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import MarqueeBar from "@/components/ui/MarqueeBar";
import SplitText from "@/components/ui/SplitText";
import ScrambleText from "@/components/ui/ScrambleText";
import type { HomeData, SiteData } from "@/lib/types";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
  }),
};

function HighlightText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <span key={i} className="text-[#c8ff00]">{part.slice(2, -2)}</span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

export default function HomeContent({
  home,
  site,
  partners,
}: {
  home: HomeData;
  site: SiteData;
  partners: string[];
}) {
  const { hero, services, about, cta } = home;
  const [intro, setIntro] = useState(true);

  useEffect(() => {
    const dismiss = () => setIntro(false);
    window.addEventListener("click", dismiss, { once: true });
    window.addEventListener("touchstart", dismiss, { once: true, passive: true });
    return () => {
      window.removeEventListener("click", dismiss);
      window.removeEventListener("touchstart", dismiss);
    };
  }, []);

  return (
    <>
      {/* ── INTRO OVERLAY ─────────────────────────────────── */}
      <AnimatePresence>
        {intro && (
          <motion.div
            key="intro"
            className="fixed inset-0 z-[200] bg-[#080808] flex flex-col items-center justify-center cursor-pointer overflow-hidden"
            exit={{ opacity: 0, transition: { duration: 0.5, delay: 0.3 } }}
            onClick={() => setIntro(false)}
          >
            {/* 그리드 배경 */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(#1e1e1e 1px, transparent 1px), linear-gradient(90deg, #1e1e1e 1px, transparent 1px)",
                backgroundSize: "80px 80px",
                opacity: 0.3,
              }}
            />

            {/* 라임 glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(200,255,0,0.06) 0%, transparent 70%)",
              }}
            />

            {/* 스캔라인 */}
            <div className="hero-scanline" />

            {/* 메인 텍스트 */}
            <motion.div
              className="text-center select-none px-4"
              initial={{ opacity: 0, scale: 1.15 }}
              animate={{ opacity: 1, scale: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
              exit={{ scale: 0.12, y: "-30vh", opacity: 0, transition: { duration: 0.7, ease: [0.4, 0, 0.6, 1] } }}
            >
              <div className="font-black leading-[0.85] tracking-[-0.04em] text-[clamp(5rem,18vw,20rem)] text-outline">
                SEHYUN
              </div>
              <div className="font-black leading-[0.85] tracking-[-0.04em] text-[clamp(5rem,18vw,20rem)]">
                <span className="text-glitch" data-text="ICT">ICT</span>
              </div>
            </motion.div>

            {/* 태그라인 */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.6, duration: 0.5 } }}
              exit={{ opacity: 0 }}
              className="absolute bottom-16 font-mono text-[11px] tracking-[0.35em] uppercase text-[#444]"
            >
              <motion.span
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              >
                Scroll or Click to Enter
              </motion.span>
            </motion.p>

            {/* 코너 데코 */}
            <div className="absolute top-8 left-8 font-mono text-[10px] tracking-[0.25em] uppercase text-[#2a2a2a]">
              Est. {site.establishedYear}
            </div>
            <div className="absolute top-8 right-8 font-mono text-[10px] tracking-[0.25em] uppercase text-[#2a2a2a]">
              {site.location}
            </div>
            <div className="absolute bottom-8 left-8 font-mono text-[10px] tracking-[0.25em] uppercase text-[#2a2a2a]">
              Leader of Smarter World
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative min-h-[100svh] flex flex-col justify-between px-6 md:px-12 pt-28 pb-12 overflow-hidden">

        {/* 배경: 그리드 */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(#1e1e1e 1px, transparent 1px), linear-gradient(90deg, #1e1e1e 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            opacity: 0.25,
          }}
        />

        {/* 배경: 라임 glow orb */}
        <div
          className="hero-orb"
          style={{
            width: "70vw",
            height: "70vw",
            top: "-20%",
            left: "50%",
            transform: "translateX(-50%)",
            background:
              "radial-gradient(circle, rgba(200,255,0,0.06) 0%, rgba(200,255,0,0.02) 45%, transparent 70%)",
          }}
        />

        {/* 배경: 스캔라인 */}
        <div className="hero-scanline" style={{ animationDelay: "-2s" }} />


        {/* 센터 콘텐츠 */}
        <div className="relative z-10 mb-auto flex flex-col items-center text-center" style={{ marginTop: "-20px" }}>
          {!intro && (
            <>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="font-mono text-xs tracking-[0.3em] uppercase text-[#c8ff00] mb-6"
              >
                ✦ <ScrambleText text={hero.tagline} delay={0.2} />
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <h1 className="font-black leading-[0.88] tracking-[-0.04em] text-[clamp(4rem,12vw,11rem)]">
                  <SplitText text={hero.title1} delay={0.25} stagger={0.05} className="text-outline" />
                </h1>
                <h1 className="font-black leading-[0.88] tracking-[-0.04em] text-[clamp(4rem,12vw,11rem)]">
                  <span className="text-glitch" data-text={hero.title2}>{hero.title2}</span>
                </h1>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="mt-8 max-w-md text-sm leading-relaxed text-[#ededed]"
              >
                {hero.description.split("\n").map((line, i, arr) => (
                  <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
                ))}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.6 }}
                className="mt-10 flex flex-wrap items-center justify-center gap-3"
              >
                <a
                  href={hero.btn1Href}
                  target={hero.btn1Target}
                  rel={hero.btn1Target === "_blank" ? "noopener noreferrer" : undefined}
                  className="group flex items-center gap-2 bg-[#c8ff00] text-[#080808] text-xs font-bold tracking-widest uppercase px-6 py-3 hover:bg-[#d4ff33] transition-colors"
                >
                  {hero.btn1Label}
                  <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
                <a
                  href={hero.btn2Href}
                  target={hero.btn2Target}
                  rel={hero.btn2Target === "_blank" ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-2 border border-[#1e1e1e] text-[#ddd9d9] text-xs font-medium tracking-widest uppercase px-6 py-3 hover:border-[#444] hover:text-[#f0f0f0] transition-colors"
                >
                  {hero.btn2Label}
                </a>
              </motion.div>
            </>
          )}
        </div>

        {/* 스크롤 인디케이터 */}
        {!intro && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="flex items-center justify-center gap-3 relative z-10"
          >
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            >
              <ArrowDown size={14} className="text-[#d1d1d1]" />
            </motion.div>
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#d1d1d1]">Scroll</span>
          </motion.div>
        )}
      </section>

      {/* ── MARQUEE ──────────────────────────────────────── */}
      <MarqueeBar partners={partners} />

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
          {services.map(({ num, title, desc, href }, i) => (
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
                className="card-hover group flex flex-col justify-between gap-8 bg-[#080808] border border-[#1e1e1e] p-8 h-full hover:bg-[#0d0d0d] transition-colors"
              >
                <div className="flex items-start justify-between">
                  <span className="font-mono text-xs text-[#a1a1a1] tracking-widest">{num}</span>
                  <ArrowUpRight size={14} className="text-[#a1a1a1] group-hover:text-[#c8ff00] transition-colors" />
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

      {/* ── SEBIT BRAND ──────────────────────────────────── */}
      <section className="px-6 md:px-12 py-24 border-t border-[#1e1e1e]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-[#c8ff00] mb-4">✦ Brand</p>
            <h2 className="font-black tracking-[-0.03em] text-[clamp(2rem,5vw,4rem)] leading-tight">
              <span className="text-outline">SE</span>
              <span className="text-[#c8ff00]">bit</span>
            </h2>
            <p className="mt-3 text-sm text-[#b5b5b5] max-w-md leading-relaxed">
              From Sehyun to the World, Every Bit Matters.
            </p>
          </div>
          <a
            href="http://sebit.co.kr"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 border border-[#1e1e1e] text-[#ddd9d9] text-xs font-medium tracking-widest uppercase px-6 py-3 hover:border-[#c8ff00] hover:text-[#c8ff00] transition-colors shrink-0"
          >
            sebit.co.kr
            <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#1e1e1e]">
          {[
            { name: "SEbit Nexus", category: "iPaaS", desc: "AI Flow Builder 기반의 통합 플랫폼. API Gateway, DLQ Manager로 엔터프라이즈 연동을 자동화합니다.", accent: "#c8ff00" },
            { name: "SEbit AI", category: "LLM", desc: "Context Engineering 기술로 구현한 AI 에이전트. Agen-D, Agen-Sight, Agen-Talk 시리즈.", accent: "#ff3cac" },
            { name: "SEbit LUMO", category: "Mobile", desc: "iOS · Android 통합 크로스플랫폼 모바일 개발 프레임워크.", accent: "#ddd9d9" },
            { name: "SEbit GeoAxis", category: "GIS / CAD", desc: "2D/3D GIS 엔진, CAD Viewer, AR 시각화, 시설물 관리 솔루션.", accent: "#c8ff00" },
          ].map(({ name, category, desc, accent }, i) => (
            <motion.a
              key={name}
              href="http://sebit.co.kr"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
              className="sebit-card group bg-[#080808] border border-[#1e1e1e] p-6 flex flex-col gap-5 cursor-none"
            >
              <div className="flex items-start justify-between">
                <span
                  className="font-mono text-[10px] tracking-widest uppercase border px-2 py-0.5"
                  style={{ color: accent, borderColor: `${accent}40` }}
                >
                  {category}
                </span>
                <ArrowUpRight size={13} className="text-[#2a2a2a] group-hover:text-[#444] transition-colors" />
              </div>
              <div>
                <h3 className="text-base font-bold tracking-tight mb-2 transition-colors" style={{ color: accent }}>
                  {name}
                </h3>
                <p className="text-xs text-[#b5b5b5] leading-relaxed">{desc}</p>
              </div>
            </motion.a>
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
            <HighlightText text={about.text} />
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-8"
          >
            <Link
              href={about.linkHref}
              className="group inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] uppercase text-[#b5b5b5] hover:text-[#f0f0f0] transition-colors border-b border-[#1e1e1e] pb-1 hover:border-[#444]"
            >
              {about.linkLabel}
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
              ✦ {cta.tagline}
            </p>
            <h2 className="font-black tracking-[-0.03em] text-[clamp(2.5rem,6vw,5rem)] leading-[0.95]">
              <span className="text-outline">{cta.title1}</span>
              <br />
              <span className="text-[#f0f0f0]">{cta.title2}</span>
            </h2>
          </div>
          <Link
            href={cta.btnHref}
            className="group flex-shrink-0 flex items-center gap-3 border border-[#1e1e1e] px-8 py-4 text-sm font-bold tracking-widest uppercase text-[#f0f0f0] hover:bg-[#c8ff00] hover:text-[#080808] hover:border-[#c8ff00] transition-all"
          >
            {cta.btnLabel}
            <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </motion.div>

        <div className="mt-16 pt-8 border-t border-[#1e1e1e] flex flex-col md:flex-row justify-between gap-4">
          <span className="font-mono text-xs text-[#a1a1a1] tracking-wider">{site.footer.copyright}</span>
          <span className="font-mono text-xs text-[#a1a1a1] tracking-wider">{site.footer.contact}</span>
        </div>
      </section>
    </>
  );
}
