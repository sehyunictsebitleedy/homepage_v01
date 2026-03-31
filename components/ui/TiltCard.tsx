"use client";

import { useRef } from "react";
import type { MouseEvent, TouchEvent, ReactNode, CSSProperties } from "react";

export default function TiltCard({
  children,
  className = "",
  style,
  intensity = 7,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const applyTilt = (clientX: number, clientY: number, scale = 1) => {
    const el = ref.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    el.style.transition = "transform 0.08s ease";
    el.style.transform = `perspective(900px) rotateX(${-y * intensity * scale}deg) rotateY(${x * intensity * scale}deg) translateZ(6px)`;
  };

  const resetTilt = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)";
    el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0)";
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => applyTilt(e.clientX, e.clientY);
  const handleMouseLeave = () => resetTilt();

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    if (!e.touches[0]) return;
    applyTilt(e.touches[0].clientX, e.touches[0].clientY, 0.6);
  };
  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (!e.touches[0]) return;
    applyTilt(e.touches[0].clientX, e.touches[0].clientY, 0.6);
  };
  const handleTouchEnd = () => resetTilt();

  return (
    <div
      ref={ref}
      className={className}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {children}
    </div>
  );
}
