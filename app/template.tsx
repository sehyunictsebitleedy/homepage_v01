"use client";

import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      {/* 페이지 콘텐츠 */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>

      {/* 하단 라인 와이프 */}
      <motion.div
        className="fixed bottom-0 left-0 w-full h-[3px] z-[150] pointer-events-none"
        style={{
          background: "linear-gradient(90deg, #c8ff00, #ff3cac)",
          transformOrigin: "left center",
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: [0, 1, 1, 0] }}
        transition={{
          duration: 0.7,
          times: [0, 0.4, 0.6, 1],
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
