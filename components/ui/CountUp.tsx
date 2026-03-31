"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

export default function CountUp({
  to,
  from = 0,
  duration = 1.2,
  className,
  suffix = "",
  padStart = 0,
}: {
  to: number;
  from?: number;
  duration?: number;
  className?: string;
  suffix?: string;
  padStart?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [count, setCount] = useState(from);

  useEffect(() => {
    if (!isInView) return;
    const range = to - from;
    const fps = 60;
    const total = Math.round(duration * fps);
    let frame = 0;
    const timer = setInterval(() => {
      frame++;
      const eased = 1 - Math.pow(1 - frame / total, 3);
      setCount(Math.round(from + eased * range));
      if (frame >= total) {
        setCount(to);
        clearInterval(timer);
      }
    }, 1000 / fps);
    return () => clearInterval(timer);
  }, [isInView, to, from, duration]);

  const display = padStart > 0 ? String(count).padStart(padStart, "0") : String(count);

  return (
    <span ref={ref} className={className}>
      {display}{suffix}
    </span>
  );
}
