"use client";

import { motion } from "framer-motion";
import { Phone, MapPin, Mail } from "lucide-react";
import type { ContactData } from "@/lib/types";

export default function ContactContent({ data }: { data: ContactData }) {
  const INFO = [
    { icon: Phone, label: "Tel", value: data.tel },
    { icon: Mail, label: "Email", value: data.email },
    { icon: MapPin, label: "Address", value: data.address },
  ];

  return (
    <div className="min-h-screen px-6 md:px-12 pt-12 pb-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mb-20"
      >
        <p className="font-mono text-xs tracking-[0.3em] uppercase text-[#c8ff00] mb-4">
          ✦ Contact
        </p>
        <h1 className="font-black tracking-[-0.04em] leading-[0.9] text-[clamp(3rem,8vw,7rem)] text-[#f0f0f0]">
          GET IN<br />TOUCH
        </h1>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="space-y-0 divide-y divide-[#1e1e1e]"
        >
          {INFO.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-start gap-5 py-6">
              <div className="w-8 h-8 border border-[#1e1e1e] flex items-center justify-center shrink-0 mt-0.5">
                <Icon size={13} className="text-[#c8ff00]" />
              </div>
              <div>
                <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#d1d1d1] mb-1">
                  {label}
                </p>
                <p className="text-sm text-[#ddd9d9]">{value}</p>
              </div>
            </div>
          ))}
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="space-y-4"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-mono text-[10px] tracking-[0.25em] uppercase text-[#d1d1d1] mb-2">
                Name
              </label>
              <input
                type="text"
                className="w-full bg-transparent border border-[#1e1e1e] text-[#f0f0f0] text-sm px-3 py-2.5 outline-none focus:border-[#c8ff00] transition-colors"
                placeholder="홍길동"
              />
            </div>
            <div>
              <label className="block font-mono text-[10px] tracking-[0.25em] uppercase text-[#d1d1d1] mb-2">
                Company
              </label>
              <input
                type="text"
                className="w-full bg-transparent border border-[#1e1e1e] text-[#f0f0f0] text-sm px-3 py-2.5 outline-none focus:border-[#c8ff00] transition-colors"
                placeholder="회사명"
              />
            </div>
          </div>
          <div>
            <label className="block font-mono text-[10px] tracking-[0.25em] uppercase text-[#d1d1d1] mb-2">
              Email
            </label>
            <input
              type="email"
              className="w-full bg-transparent border border-[#1e1e1e] text-[#f0f0f0] text-sm px-3 py-2.5 outline-none focus:border-[#c8ff00] transition-colors"
              placeholder="email@example.com"
            />
          </div>
          <div>
            <label className="block font-mono text-[10px] tracking-[0.25em] uppercase text-[#d1d1d1] mb-2">
              Message
            </label>
            <textarea
              rows={5}
              className="w-full bg-transparent border border-[#1e1e1e] text-[#f0f0f0] text-sm px-3 py-2.5 outline-none focus:border-[#c8ff00] transition-colors resize-none"
              placeholder="문의 내용을 입력하세요"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#c8ff00] text-[#080808] text-xs font-bold tracking-widest uppercase py-3 hover:bg-[#d4ff33] transition-colors"
          >
            Send Message
          </button>
        </motion.form>
      </div>
    </div>
  );
}
