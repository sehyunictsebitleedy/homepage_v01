"use client";

import { useState } from "react";
import Link from "next/link";

export interface MarqueeItem {
  title: string;
  client: string;
}

interface Props {
  items: MarqueeItem[];
}

export default function MarqueeBar({ items }: Props) {
  const [paused, setPaused] = useState(false);
  const list = items.length > 0 ? items : [{ title: "SEHYUN ICT", client: "" }];
  const doubled = [...list, ...list];

  return (
    <Link
      href="/project"
      className="block overflow-hidden border-y border-[#1e1e1e] py-3 bg-[#080808] cursor-pointer"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="flex whitespace-nowrap w-max"
        style={{
          animation: "marquee 70s linear infinite",
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-4 px-6">
            <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#d1d1d1]">
              {item.title}
            </span>
            {item.client && (
              <span className="text-[10px] font-mono tracking-widest text-[#555] uppercase">
                {item.client}
              </span>
            )}
            <span className="text-[#c8ff00] text-xs">✦</span>
          </span>
        ))}
      </div>
    </Link>
  );
}
