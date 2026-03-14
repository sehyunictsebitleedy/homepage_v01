"use client";

const ITEMS = [
  "2D GIS Engine",
  "CAD Compare",
  "CAD View",
  "IT Solution Provider",
  "Smarter World",
  "Digital Infrastructure",
];

export default function MarqueeBar() {
  return (
    <div className="overflow-hidden border-y border-[#1e1e1e] py-3 bg-[#080808]">
      <div className="flex animate-[marquee_20s_linear_infinite] whitespace-nowrap w-max">
        {[...ITEMS, ...ITEMS].map((item, i) => (
          <span key={i} className="flex items-center gap-6 px-6">
            <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#444]">
              {item}
            </span>
            <span className="text-[#c8ff00] text-xs">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
