"use client";

import { motion } from "framer-motion";

interface Props {
  text: string;
  className?: string;
  /** 전체 시작 딜레이 (초) */
  delay?: number;
  /** 글자 간 stagger (초) */
  stagger?: number;
  "data-text"?: string;
}

/**
 * 글자별로 아래→위로 슬라이드 reveal 되는 타이포 컴포넌트.
 * 각 글자는 overflow:hidden 마스크 안에서 올라옵니다.
 */
export default function SplitText({
  text,
  className,
  delay = 0,
  stagger = 0.045,
  "data-text": dataText,
}: Props) {
  return (
    <span className={className} aria-label={text} data-text={dataText} style={{ display: "inline-flex", flexWrap: "wrap" }}>
      {text.split("").map((char, i) => (
        <span key={i} style={{ display: "inline-block", overflow: "hidden", lineHeight: "inherit" }}>
          <motion.span
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              delay: delay + i * stagger,
              duration: 0.75,
              ease: "easeOut",
            }}
            style={{ display: "inline-block" }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
