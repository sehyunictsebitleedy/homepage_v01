"use client";

import { motion } from "framer-motion";
import type { CompanyData } from "@/lib/types";
import CountUp from "@/components/ui/CountUp";

export default function CompanyContent({ data }: { data: CompanyData }) {
  return (
    <div className="min-h-screen px-6 md:px-12 pt-12 pb-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mb-20"
      >
        <p className="font-mono text-xs tracking-[0.3em] uppercase text-[#c8ff00] mb-4">
          ✦ Company
        </p>
        <h1 className="font-black tracking-[-0.04em] leading-[0.9] text-[clamp(3rem,8vw,7rem)] text-[#f0f0f0]">
          WHO<br />WE ARE
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.7 }}
        className="mb-24 max-w-2xl"
      >
        <p className="text-[clamp(1rem,2vw,1.25rem)] leading-[1.8] text-[#ededed]">
          {data.description}
        </p>
      </motion.div>

      <div className="mb-24 grid grid-cols-1 md:grid-cols-3 gap-px bg-[#1e1e1e]">
        {[
          { label: "Mission", text: data.mission },
          { label: "Vision", text: data.vision },
          { label: "Core Value", text: data.coreValue },
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

      <div>
        <p className="font-mono text-xs tracking-[0.25em] uppercase text-[#d1d1d1] mb-10">
          — Company History
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px">
          {data.history.map(({ year, events }, i) => (
            <motion.div
              key={year}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              className="bg-[#080808] p-5 flex gap-4"
            >
              <CountUp
                to={parseInt(year)}
                from={parseInt(year) - 3}
                duration={0.8}
                className="font-mono text-xs tracking-widest text-[#c8ff00] w-12 shrink-0 pt-0.5"
              />
              <div className="flex flex-col gap-1">
                {events.map((ev, ei) => (
                  <span key={ei} className="text-sm text-[#ddd9d9] leading-snug">{ev}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
