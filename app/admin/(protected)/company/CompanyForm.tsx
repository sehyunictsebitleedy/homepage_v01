"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import type { CompanyData, HistoryItem } from "@/lib/types";
import { saveCompany } from "./actions";

const inputCls = "w-full bg-[#080808] border border-[#1e1e1e] text-[#f0f0f0] text-sm px-3 py-2 outline-none focus:border-[#c8ff00] transition-colors";
const labelCls = "block text-[10px] font-mono tracking-widest uppercase text-[#a1a1a1] mb-1";

export default function CompanyForm({ initial }: { initial: CompanyData }) {
  const [data, setData] = useState<CompanyData>(initial);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  const set = (key: keyof Omit<CompanyData, "history">, value: string) =>
    setData((d) => ({ ...d, [key]: value }));

  const setHistory = (history: HistoryItem[]) => setData((d) => ({ ...d, history }));

  const updateHistory = (i: number, field: keyof HistoryItem, value: string) =>
    setHistory(data.history.map((item, idx) => idx === i ? { ...item, [field]: value } : item));

  const addHistory = () =>
    setHistory([...data.history, { year: String(new Date().getFullYear()), event: "" }]);

  const removeHistory = (i: number) =>
    setHistory(data.history.filter((_, idx) => idx !== i));

  const handleSave = async () => {
    setStatus("saving");
    const res = await saveCompany(data);
    setStatus(res.success ? "saved" : "error");
    if (res.success) setTimeout(() => setStatus("idle"), 2000);
  };

  return (
    <div className="max-w-2xl space-y-8">
      {/* 기본 정보 */}
      <section className="border border-[#1e1e1e] bg-[#0d0d0d] p-6 space-y-4">
        <h2 className="text-xs font-mono tracking-widest uppercase text-[#c8ff00] mb-4">기본 정보</h2>
        <div>
          <label className={labelCls}>회사 소개 (description)</label>
          <textarea rows={3} className={inputCls + " resize-none"} value={data.description}
            onChange={(e) => set("description", e.target.value)} />
        </div>
        <div>
          <label className={labelCls}>Mission</label>
          <input className={inputCls} value={data.mission} onChange={(e) => set("mission", e.target.value)} />
        </div>
        <div>
          <label className={labelCls}>Vision</label>
          <input className={inputCls} value={data.vision} onChange={(e) => set("vision", e.target.value)} />
        </div>
        <div>
          <label className={labelCls}>Core Value</label>
          <input className={inputCls} value={data.coreValue} onChange={(e) => set("coreValue", e.target.value)} />
        </div>
      </section>

      {/* 연혁 */}
      <section className="border border-[#1e1e1e] bg-[#0d0d0d] p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs font-mono tracking-widest uppercase text-[#c8ff00]">연혁 (History)</h2>
          <button onClick={addHistory}
            className="flex items-center gap-1.5 text-xs text-[#a1a1a1] hover:text-[#c8ff00] transition-colors">
            <Plus size={13} /> 추가
          </button>
        </div>
        <div className="space-y-2">
          {data.history.map((item, i) => (
            <div key={i} className="flex gap-2 items-center">
              <input
                className={inputCls + " w-24 shrink-0"}
                placeholder="연도"
                value={item.year}
                onChange={(e) => updateHistory(i, "year", e.target.value)}
              />
              <input
                className={inputCls + " flex-1"}
                placeholder="사건"
                value={item.event}
                onChange={(e) => updateHistory(i, "event", e.target.value)}
              />
              <button onClick={() => removeHistory(i)}
                className="text-[#555] hover:text-[#ff3cac] transition-colors shrink-0">
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      </section>

      <SaveButton status={status} onClick={handleSave} />
    </div>
  );
}

function SaveButton({ status, onClick }: { status: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      disabled={status === "saving"}
      className="bg-[#c8ff00] text-[#080808] text-xs font-bold tracking-widest uppercase px-8 py-3 hover:bg-[#d4ff33] transition-colors disabled:opacity-50"
    >
      {status === "saving" ? "저장 중..." : status === "saved" ? "저장됨 ✓" : status === "error" ? "오류 발생" : "저장"}
    </button>
  );
}
