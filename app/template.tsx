"use client";

import { motion } from "framer-motion";

const BARS = 7;
const COLORS = ["#c8ff00", "#c8ff00", "#ff3cac", "#c8ff00", "#c8ff00", "#ff3cac", "#c8ff00"];

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      {/* 페이지 콘텐츠 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, delay: 0.18 }}
      >
        {children}
      </motion.div>

      {/* 스태거 바 와이프 */}
      {Array.from({ length: BARS }).map((_, i) => (
        <motion.div
          key={i}
          className="fixed left-0 right-0 z-[150] pointer-events-none"
          style={{
            top: `${(i / BARS) * 100}%`,
            height: `${100 / BARS}vh`,
            backgroundColor: COLORS[i],
          }}
          initial={{ x: "0%" }}
          animate={{ x: "101%" }}
          transition={{
            duration: 0.22,
            delay: i * 0.03,
            ease: [0.76, 0, 0.24, 1],
          }}
        />
      ))}
    </div>
  );
}
