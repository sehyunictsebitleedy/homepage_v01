"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // 다이아몬드: 즉각 추적
  const dotX = useSpring(mouseX, { stiffness: 1000, damping: 50, mass: 0.1 });
  const dotY = useSpring(mouseY, { stiffness: 1000, damping: 50, mass: 0.1 });

  // 링: 더 느린 트레일
  const ringX = useSpring(mouseX, { stiffness: 80, damping: 18, mass: 0.8 });
  const ringY = useSpring(mouseY, { stiffness: 80, damping: 18, mass: 0.8 });

  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      });
      if (!visible) setVisible(true);
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);
    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);

    const onHoverIn = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("a, button, [data-cursor-hover]")) setHovering(true);
    };
    const onHoverOut = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("a, button, [data-cursor-hover]")) setHovering(false);
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);
    document.addEventListener("mouseover", onHoverIn);
    document.addEventListener("mouseout", onHoverOut);

    return () => {
      cancelAnimationFrame(rafRef.current);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseover", onHoverIn);
      document.removeEventListener("mouseout", onHoverOut);
    };
  }, [mouseX, mouseY, visible]);

  return (
    <>
      {/* 핑크 대시 링 - 느린 트레일 + 상시 회전 */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          className="rounded-full border border-dashed"
          animate={{
            rotate: 360,
            width: hovering ? 54 : clicking ? 24 : 38,
            height: hovering ? 54 : clicking ? 24 : 38,
            borderColor: hovering ? "#c8ff00" : "#ff3cac",
            backgroundColor: hovering ? "rgba(200,255,0,0.05)" : "transparent",
          }}
          transition={{
            rotate: { duration: 5, ease: "linear", repeat: Infinity },
            width: { duration: 0.25, ease: "easeOut" },
            height: { duration: 0.25, ease: "easeOut" },
            borderColor: { duration: 0.3 },
            backgroundColor: { duration: 0.3 },
          }}
        />
      </motion.div>

      {/* 라임 다이아몬드 도트 - 즉각 추적 */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] bg-[#c8ff00]"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          rotate: 45,
        }}
        animate={{
          opacity: visible ? 1 : 0,
          width: hovering ? 8 : clicking ? 4 : 6,
          height: hovering ? 8 : clicking ? 4 : 6,
        }}
        transition={{ duration: 0.15 }}
      />
    </>
  );
}
