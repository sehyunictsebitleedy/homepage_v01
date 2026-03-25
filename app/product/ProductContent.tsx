"use client";

import { motion } from "framer-motion";
import type { ProductData } from "@/lib/types";

export default function ProductContent({ data }: { data: ProductData }) {
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
        {data.products.map(({ id, name, tagline, desc, features, accent }, i) => (
          <motion.div
            key={id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="bg-[#080808] p-8 md:p-12"
          >
            <div className="flex flex-col md:flex-row md:items-start gap-8 md:gap-16">
              <div className="md:w-80 shrink-0">
                <span className="font-mono text-xs text-[#a1a1a1] tracking-widest block mb-4">{id}</span>
                <h2 className="text-2xl font-black tracking-tight mb-2" style={{ color: accent }}>
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
