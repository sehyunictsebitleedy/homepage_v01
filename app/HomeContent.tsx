"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useMotionValue, useSpring, type Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import MarqueeBar from "@/components/ui/MarqueeBar";
import ScrambleText from "@/components/ui/ScrambleText";
import TiltCard from "@/components/ui/TiltCard";
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
  const parts = text.split(/(\*\*[^*]+\*\*|\n)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <span key={i} className="text-[#c8ff00]">{part.slice(2, -2)}</span>
        ) : part === "\n" ? (
          <br key={i} />
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
  marqueeItems,
}: {
  home: HomeData;
  site: SiteData;
  marqueeItems: { title: string; client: string }[];
}) {
  const { hero, services, about, cta } = home;
  const [intro, setIntro] = useState(true);

  // Hero 마우스 패럴랙스
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 18 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 18 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 24);
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 12);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const timer = setTimeout(() => setIntro(false), 1700);
    return () => clearTimeout(timer);
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
            {/* 라임 glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(200,255,0,0.06) 0%, transparent 70%)",
              }}
            />

            {/* 메인 텍스트 — scanline reveal */}
            <motion.div
              className="text-center select-none px-4"
              exit={{ scale: 0.12, y: "-30vh", opacity: 0, transition: { duration: 0.7, ease: [0.4, 0, 0.6, 1] as [number,number,number,number] } }}
            >
              {/* SEHYUN */}
              <div className="relative" style={{ overflow: "hidden" }}>
                <motion.div
                  className="font-black leading-[0.85] tracking-[-0.04em] text-[clamp(5rem,18vw,20rem)] text-outline"
                  initial={{ clipPath: "inset(100% 0 0 0)" }}
                  animate={{ clipPath: "inset(0% 0 0 0)", transition: { duration: 0.55, delay: 0.15, ease: "linear" } }}
                >
                  SEHYUN
                </motion.div>
                <motion.div
                  className="absolute left-0 right-0 h-[3px] pointer-events-none"
                  style={{ background: "#c8ff00", boxShadow: "0 0 14px #c8ff00, 0 0 40px rgba(200,255,0,0.35)", top: 0 }}
                  initial={{ top: 0, opacity: 1 }}
                  animate={{ top: "100%", opacity: 0, transition: { duration: 0.55, delay: 0.15, ease: "linear" } }}
                />
              </div>

              {/* ICT — 슬롯머신 stagger */}
              <motion.div
                className="flex justify-center font-black leading-[0.85] tracking-[-0.04em] text-[clamp(5rem,18vw,20rem)] text-[#c8ff00]"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.8 } },
                }}
              >
                {["I", "C", "T"].map((char) => (
                  <motion.span
                    key={char}
                    style={{ display: "inline-block" }}
                    variants={{
                      hidden: { clipPath: "inset(100% 0 0 0)", y: -16 },
                      visible: { clipPath: "inset(0% 0 0 0)", y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.div>
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

        {/* 배경: hero 영상 */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="pointer-events-none absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.15 }}
        >
          <source src="/hero_main_bg.mp4" type="video/mp4" />
        </video>

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
                style={{ x: springX, y: springY }}
              >
                <h1 className="font-black leading-[0.88] tracking-[-0.04em] text-[clamp(4rem,12vw,11rem)] whitespace-nowrap">
                  <span className="text-outline">{hero.title1}</span>
                  <span className="text-glitch" data-text={hero.title2}>{hero.title2}</span>
                </h1>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="mt-8 max-w-lg text-base leading-relaxed text-[#ededed]"
              >
                {hero.description.split("\n").map((line, i, arr) => (
                  <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
                ))}
              </motion.p>

              {/* 사업 영역 — 교집합 원형 */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.95, duration: 0.6 }}
                className="mt-10 flex items-center justify-center"
              >
                {[
                  ...hero.circles,
                ].map((item, idx) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.target}
                    rel={item.target === "_blank" ? "noopener noreferrer" : undefined}
                    className="group relative flex flex-col items-center justify-center transition-[border-color,box-shadow] duration-400"
                    style={{
                      width: "clamp(100px, 26vw, 260px)",
                      height: "clamp(100px, 26vw, 260px)",
                      borderRadius: "50%",
                      border: "1px solid #333",
                      marginLeft: idx === 0 ? 0 : "clamp(6px, 2.5vw, 30px)",
                      background: "rgba(8,8,8,0.4)",
                      backdropFilter: "blur(8px)",
                      zIndex: idx,
                      transition: "border-color 0.4s, box-shadow 0.4s",
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = "#c8ff00";
                      el.style.boxShadow = "0 0 0 1px #c8ff00, 0 0 20px rgba(200,255,0,0.25), inset 0 0 20px rgba(200,255,0,0.04)";
                      el.style.zIndex = "10";
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = "#333";
                      el.style.boxShadow = "none";
                      el.style.zIndex = String(idx);
                    }}
                  >
                    <div className="flex flex-col items-center justify-center gap-1 px-3 text-center">
                      <span className="font-sans font-bold text-[11px] sm:text-[20px] tracking-tight text-[#f0f0f0] group-hover:text-[#c8ff00] transition-colors duration-300 leading-snug">
                        {item.label.split(/\\n|\n|\/n/).map((line, i, arr) => (
                          <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
                        ))}
                      </span>
                      <span className="font-mono text-[11px] sm:text-[12px] tracking-wide text-[#9f9f9f] leading-relaxed">
                        {item.desc.split(/\\n|\n|\/n/).map((line, i, arr) => (
                          <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
                        ))}
                      </span>
                    </div>
                  </a>
                ))}
              </motion.div>

              {(hero.btn1Enabled || hero.btn2Enabled) && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0, duration: 0.6 }}
                  className="mt-10 flex flex-wrap items-center justify-center gap-3"
                >
                  {hero.btn1Enabled && (
                    <a
                      href={hero.btn1Href}
                      target={hero.btn1Target}
                      rel={hero.btn1Target === "_blank" ? "noopener noreferrer" : undefined}
                      className="group flex items-center gap-2 bg-[#c8ff00] text-[#080808] text-xs font-bold tracking-widest px-6 py-3 hover:bg-[#d4ff33] transition-colors"
                    >
                      {hero.btn1Label}
                      <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  )}
                  {hero.btn2Enabled && (
                    <a
                      href={hero.btn2Href}
                      target={hero.btn2Target}
                      rel={hero.btn2Target === "_blank" ? "noopener noreferrer" : undefined}
                      className="flex items-center gap-2 border border-[#343434] text-[#ddd9d9] text-xs font-medium tracking-widest uppercase px-6 py-3 hover:border-[#444] hover:text-[#f0f0f0] transition-colors"
                    >
                      {hero.btn2Label}
                    </a>
                  )}
                </motion.div>
              )}
            </>
          )}
        </div>

      </section>

      {/* ── MARQUEE ──────────────────────────────────────── */}
      <MarqueeBar items={marqueeItems} />

      {/* ── SEbit BRAND ──────────────────────────────────── */}
      <section className="px-6 md:px-12 py-14 border-t border-[#343434]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-[#c8ff00] mb-4">✦ Brand</p>
            <motion.h2
              className="font-black tracking-[-0.03em] text-[clamp(3rem,7.5vw,6rem)] leading-tight"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
            >
              {[["S","E"],["b","i","t"]].map((group, gi) =>
                group.map((char, ci) => (
                  <motion.span
                    key={`${gi}-${ci}`}
                    style={{ display: "inline-block" }}
                    className={gi === 0 ? "text-outline" : "text-[#c8ff00]"}
                    variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16,1,0.3,1] } } }}
                  >
                    {char}
                  </motion.span>
                ))
              )}
            </motion.h2>
            <p className="mt-3 text-sm text-[#b5b5b5] max-w-md leading-relaxed">
              From Sehyun to the World, Every Bit Matters.
            </p>
          </div>
          <a
            href="http://sebit.co.kr"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 border border-[#343434] text-[#ddd9d9] text-xs font-medium tracking-widest px-6 py-3 hover:border-[#c8ff00] hover:text-[#c8ff00] transition-colors shrink-0"
          >
            SEbit.co.kr
            <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#343434]">
          {[
            { name: "SEbit Nexus", category: "iPaaS", desc: "AI Flow Builder 기반의 통합 플랫폼. API Gateway, DLQ Manager로 엔터프라이즈 연동을 자동화합니다.", accent: "#c8ff00" },
            { name: "SEbit AI", category: "LLM", desc: "Context Engineering 기술로 구현한 AI 에이전트. Agen-D, Agen-Sight, Agen-Talk 시리즈.", accent: "#ff3cac" },
            { name: "SEbit LUMO", category: "Mobile", desc: "iOS · Android 통합 크로스플랫폼 모바일 개발 프레임워크.", accent: "#ddd9d9" },
            { name: "SEbit GeoAxis", category: "GIS / CAD", desc: "2D/3D GIS 엔진, CAD Viewer, AR 시각화, 시설물 관리 솔루션.", accent: "#c8ff00" },
          ].map(({ name, category, desc }, i) => (
            <motion.a
              key={name}
              href="http://sebit.co.kr"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
              className="sebit-card group bg-[#080808] border border-[#343434] p-6 flex flex-col gap-5 cursor-pointer relative overflow-hidden"
            >
              <div className="absolute bottom-0 left-0 h-[2px] w-full bg-[#c8ff00] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              <div className="flex items-start justify-between">
                <span
                  className="font-mono text-[10px] tracking-widest uppercase border border-[#333] px-2 py-0.5 text-[#f0f0f0]"
                >
                  {category}
                </span>
                <ArrowUpRight size={13} className="text-[#2a2a2a] group-hover:text-[#444] transition-colors" />
              </div>
              <div>
                <h3 className="text-xl font-bold tracking-tight mb-2 text-[#f0f0f0]">
                  {name}
                </h3>
                <div className="flex flex-col gap-1">
                  {desc.split(/(?<=\.) /).map((sentence, si) => (
                    <p key={si} className="text-[14px] text-[#b5b5b5] leading-relaxed">{sentence}</p>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────── */}
      <section className="px-6 md:px-12 py-14 border-t border-[#343434]">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-8 flex items-end justify-between"
        >
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="font-black tracking-[-0.03em] text-[clamp(3rem,7.5vw,6rem)] leading-tight">
              <span className="text-outline">Our</span>&nbsp;
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#343434]">
          {services.map(({ num, title, desc, href }, i) => (
            <motion.div
              key={num}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              variants={fadeUp}
              custom={i}
            >
              <TiltCard className="h-full" intensity={5}>
              <Link
                href={href}
                className="card-hover group flex flex-col justify-between gap-8 bg-[#080808] border border-[#343434] p-8 h-full hover:bg-[#0d0d0d] transition-colors"
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
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── ABOUT STRIP ──────────────────────────────────── */}
      <section
        className="px-6 md:px-12 py-36 border-t border-[#343434] relative"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-[#c8ff00] mb-4">✦ About</p>
          <motion.h2
            className="font-black tracking-[-0.03em] text-[clamp(3rem,7.5vw,6rem)] leading-tight"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.04 } } }}
          >
            {[{t:"SE",c:"text-outline"},{t:"HYUN",c:"text-[#f0f0f0]"},{t:" ICT",c:"text-[#c8ff00]"}].map(({t,c},gi) =>
              t.split("").map((char,ci) => (
                <motion.span
                  key={`${gi}-${ci}`}
                  style={{ display: "inline-block", whiteSpace: "pre" }}
                  className={c}
                  variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16,1,0.3,1] } } }}
                >
                  {char}
                </motion.span>
              ))
            )}
          </motion.h2>
        </motion.div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-end gap-8 md:gap-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex-1 text-[clamp(1.2rem,2.5vw,2rem)] font-semibold tracking-tight text-[#f0f0f0] leading-[1.4]"
          >
            <HighlightText text={about.text} />
          </motion.p>
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="shrink-0"
          >
            <Link
              href={about.linkHref}
              className="group inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] uppercase text-[#b5b5b5] hover:text-[#f0f0f0] transition-colors border-b border-[#343434] pb-1 hover:border-[#444]"
            >
              {about.linkLabel}
              <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── CONTACT CTA ──────────────────────────────────── */}
      <section className="px-6 md:px-12 py-14 border-t border-[#343434]">
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
            <h2 className="font-black tracking-[-0.03em] text-[clamp(3.75rem,9vw,7.5rem)] leading-[0.95]">
              <span className="text-outline">{cta.title1}</span>
              <br />
              <span className="text-[#f0f0f0]">{cta.title2}</span>
            </h2>
          </div>
          <Link
            href={cta.btnHref}
            className="group flex-shrink-0 flex items-center gap-3 border border-[#343434] px-8 py-4 text-sm font-bold tracking-widest uppercase text-[#f0f0f0] hover:bg-[#c8ff00] hover:text-[#080808] hover:border-[#c8ff00] transition-all"
          >
            {cta.btnLabel}
            <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </motion.div>

        <div className="mt-16 pt-8 border-t border-[#343434] flex flex-col md:flex-row justify-between gap-4">
          <span className="font-mono text-xs text-[#a1a1a1] tracking-wider">{site.footer.copyright}</span>
          <span className="font-mono text-xs text-[#a1a1a1] tracking-wider">{site.footer.contact}</span>
        </div>
      </section>
    </>
  );
}
