"use client";

import { useState } from "react";
import { Plus, Trash2, GripVertical } from "lucide-react";
import type { NavData, NavItem } from "@/lib/types";
import { saveNav } from "./actions";

const input = "w-full bg-[#080808] border border-[#1e1e1e] text-[#f0f0f0] text-sm px-3 py-2 outline-none focus:border-[#c8ff00] transition-colors";

export default function NavForm({ initial }: { initial: NavData }) {
  const [data, setData] = useState<NavData>(initial);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  const update = (i: number, patch: Partial<NavItem>) =>
    setData((d) => ({ items: d.items.map((item, idx) => idx === i ? { ...item, ...patch } : item) }));

  const add = () =>
    setData((d) => ({ items: [...d.items, { label: "", href: "/", enabled: true }] }));

  const remove = (i: number) =>
    setData((d) => ({ items: d.items.filter((_, idx) => idx !== i) }));

  const handleSave = async () => {
    setStatus("saving");
    const res = await saveNav(data);
    setStatus(res.success ? "saved" : "error");
    if (res.success) setTimeout(() => setStatus("idle"), 2000);
  };

  return (
    <div className="max-w-xl space-y-3">
      <div className="hidden grid-cols-[24px_1fr_1fr_60px_32px] gap-2 px-3 pb-1 md:grid">
        {["", "메뉴명", "링크", "활성화", ""].map((h, i) => (
          <span key={i} className="text-[10px] font-mono tracking-widest uppercase text-[#555]">{h}</span>
        ))}
      </div>

      {data.items.map((item, i) => (
        <div key={i} className="border border-[#1e1e1e] bg-[#0d0d0d] p-3 grid grid-cols-1 md:grid-cols-[24px_1fr_1fr_60px_32px] gap-2 items-center">
          <GripVertical size={14} className="text-[#333] hidden md:block" />
          <input className={input} placeholder="메뉴명" value={item.label}
            onChange={(e) => update(i, { label: e.target.value })} />
          <input className={input} placeholder="/page" value={item.href}
            onChange={(e) => update(i, { href: e.target.value })} />
          <div className="flex items-center justify-center">
            <button
              onClick={() => update(i, { enabled: !item.enabled })}
              className={`w-10 h-5 rounded-full transition-colors relative ${item.enabled ? "bg-[#c8ff00]" : "bg-[#222]"}`}
            >
              <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-[#080808] transition-all ${item.enabled ? "left-5" : "left-0.5"}`} />
            </button>
          </div>
          <button onClick={() => remove(i)} className="text-[#555] hover:text-[#ff3cac] transition-colors justify-self-center">
            <Trash2 size={14} />
          </button>
        </div>
      ))}

      <button onClick={add}
        className="w-full border border-dashed border-[#1e1e1e] py-3 text-xs text-[#a1a1a1] hover:text-[#c8ff00] hover:border-[#c8ff00]/40 transition-colors flex items-center justify-center gap-2">
        <Plus size={13} /> 메뉴 추가
      </button>

      <div className="pt-2">
        <button onClick={handleSave} disabled={status === "saving"}
          className="bg-[#c8ff00] text-[#080808] text-xs font-bold tracking-widest uppercase px-8 py-3 hover:bg-[#d4ff33] transition-colors disabled:opacity-50">
          {status === "saving" ? "저장 중..." : status === "saved" ? "저장됨 ✓" : status === "error" ? "오류 발생" : "저장"}
        </button>
      </div>
    </div>
  );
}
