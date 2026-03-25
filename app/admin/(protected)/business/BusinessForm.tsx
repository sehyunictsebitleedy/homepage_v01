"use client";

import { useState } from "react";
import { Plus, Trash2, X } from "lucide-react";
import type { BusinessData, BusinessArea } from "@/lib/types";
import { saveBusiness } from "./actions";

const inputCls = "w-full bg-[#080808] border border-[#1e1e1e] text-[#f0f0f0] text-sm px-3 py-2 outline-none focus:border-[#c8ff00] transition-colors";
const labelCls = "block text-[10px] font-mono tracking-widest uppercase text-[#a1a1a1] mb-1";

export default function BusinessForm({ initial }: { initial: BusinessData }) {
  const [data, setData] = useState<BusinessData>(initial);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  const updateArea = (i: number, patch: Partial<BusinessArea>) =>
    setData((d) => ({ areas: d.areas.map((a, idx) => idx === i ? { ...a, ...patch } : a) }));

  const addArea = () =>
    setData((d) => ({
      areas: [...d.areas, {
        num: String(d.areas.length + 1).padStart(2, "0"),
        title: "", desc: "", tags: []
      }]
    }));

  const removeArea = (i: number) =>
    setData((d) => ({ areas: d.areas.filter((_, idx) => idx !== i) }));

  const addTag = (i: number, tag: string) => {
    if (!tag.trim()) return;
    updateArea(i, { tags: [...data.areas[i].tags, tag.trim()] });
  };

  const removeTag = (i: number, t: number) =>
    updateArea(i, { tags: data.areas[i].tags.filter((_, idx) => idx !== t) });

  const handleSave = async () => {
    setStatus("saving");
    const res = await saveBusiness(data);
    setStatus(res.success ? "saved" : "error");
    if (res.success) setTimeout(() => setStatus("idle"), 2000);
  };

  return (
    <div className="max-w-2xl space-y-4">
      {data.areas.map((area, i) => (
        <section key={i} className="border border-[#1e1e1e] bg-[#0d0d0d] p-6 space-y-3">
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-xs text-[#c8ff00] tracking-widest">{area.num}</span>
            <button onClick={() => removeArea(i)}
              className="text-[#555] hover:text-[#ff3cac] transition-colors">
              <Trash2 size={14} />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>번호</label>
              <input className={inputCls} value={area.num}
                onChange={(e) => updateArea(i, { num: e.target.value })} />
            </div>
            <div>
              <label className={labelCls}>제목</label>
              <input className={inputCls} value={area.title}
                onChange={(e) => updateArea(i, { title: e.target.value })} />
            </div>
          </div>
          <div>
            <label className={labelCls}>설명</label>
            <textarea rows={2} className={inputCls + " resize-none"} value={area.desc}
              onChange={(e) => updateArea(i, { desc: e.target.value })} />
          </div>
          <div>
            <label className={labelCls}>태그</label>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {area.tags.map((tag, t) => (
                <span key={t} className="flex items-center gap-1 font-mono text-[10px] border border-[#1e1e1e] text-[#d1d1d1] px-2 py-0.5">
                  {tag}
                  <button onClick={() => removeTag(i, t)} className="text-[#555] hover:text-[#ff3cac]">
                    <X size={10} />
                  </button>
                </span>
              ))}
            </div>
            <input
              className={inputCls}
              placeholder="태그 입력 후 Enter"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  addTag(i, e.currentTarget.value);
                  e.currentTarget.value = "";
                }
              }}
            />
          </div>
        </section>
      ))}

      <button onClick={addArea}
        className="w-full border border-dashed border-[#1e1e1e] py-3 text-xs text-[#a1a1a1] hover:text-[#c8ff00] hover:border-[#c8ff00]/40 transition-colors flex items-center justify-center gap-2">
        <Plus size={13} /> 사업 영역 추가
      </button>

      <SaveButton status={status} onClick={handleSave} />
    </div>
  );
}

function SaveButton({ status, onClick }: { status: string; onClick: () => void }) {
  return (
    <button onClick={onClick} disabled={status === "saving"}
      className="bg-[#c8ff00] text-[#080808] text-xs font-bold tracking-widest uppercase px-8 py-3 hover:bg-[#d4ff33] transition-colors disabled:opacity-50">
      {status === "saving" ? "저장 중..." : status === "saved" ? "저장됨 ✓" : status === "error" ? "오류 발생" : "저장"}
    </button>
  );
}
