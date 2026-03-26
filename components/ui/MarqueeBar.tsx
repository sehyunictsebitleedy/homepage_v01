interface Props {
  partners: string[];
}

export default function MarqueeBar({ partners }: Props) {
  const items = partners.length > 0 ? partners : ["SEHYUN ICT"];
  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden border-y border-[#1e1e1e] py-3 bg-[#080808]">
      <div className="flex animate-[marquee_30s_linear_infinite] whitespace-nowrap w-max">
        {doubled.map((name, i) => (
          <span key={i} className="flex items-center gap-6 px-6">
            <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#d1d1d1]">
              {name}
            </span>
            <span className="text-[#c8ff00] text-xs">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
