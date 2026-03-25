"use client";

import { useState } from "react";
import type { SiteData } from "@/lib/types";
import { saveSite } from "./actions";

const input = "w-full bg-[#080808] border border-[#1e1e1e] text-[#f0f0f0] text-sm px-3 py-2 outline-none focus:border-[#c8ff00] transition-colors";
const label = "block text-[10px] font-mono tracking-widest uppercase text-[#a1a1a1] mb-1";

export default function SettingsForm({ initial }: { initial: SiteData }) {
  const [data, setData] = useState<SiteData>(initial);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  const set = (key: keyof Omit<SiteData, "seo" | "footer">, value: string) =>
    setData((d) => ({ ...d, [key]: value }));
  const setSeo = (key: keyof SiteData["seo"], value: string) =>
    setData((d) => ({ ...d, seo: { ...d.seo, [key]: value } }));
  const setFooter = (key: keyof SiteData["footer"], value: string) =>
    setData((d) => ({ ...d, footer: { ...d.footer, [key]: value } }));

  const handleSave = async () => {
    setStatus("saving");
    const res = await saveSite(data);
    setStatus(res.success ? "saved" : "error");
    if (res.success) setTimeout(() => setStatus("idle"), 2000);
  };

  return (
    <div className="max-w-lg space-y-6">
      {/* 기본 정보 */}
      <section className="border border-[#1e1e1e] bg-[#0d0d0d] p-6 space-y-4">
        <h2 className="text-xs font-mono tracking-widest uppercase text-[#c8ff00] pb-2">기본 정보</h2>
        <div>
          <label className={label}>사이트명</label>
          <input className={input} value={data.siteName} onChange={(e) => set("siteName", e.target.value)} />
        </div>
        <div>
          <label className={label}>로고 텍스트</label>
          <input className={input} value={data.logoText} onChange={(e) => set("logoText", e.target.value)} />
          <p className="mt-1 text-[10px] text-[#555]">※ 마지막 "ICT" 앞 부분이 흰색, "ICT"는 라임색으로 표시됩니다.</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={label}>설립 연도</label>
            <input className={input} value={data.establishedYear} onChange={(e) => set("establishedYear", e.target.value)} />
          </div>
          <div>
            <label className={label}>위치</label>
            <input className={input} value={data.location} onChange={(e) => set("location", e.target.value)} />
          </div>
        </div>
      </section>

      {/* SEO */}
      <section className="border border-[#1e1e1e] bg-[#0d0d0d] p-6 space-y-4">
        <h2 className="text-xs font-mono tracking-widest uppercase text-[#c8ff00] pb-2">SEO 설정</h2>
        <div>
          <label className={label}>페이지 타이틀</label>
          <input className={input} value={data.seo.title} onChange={(e) => setSeo("title", e.target.value)} />
        </div>
        <div>
          <label className={label}>메타 설명</label>
          <textarea rows={2} className={input + " resize-none"} value={data.seo.description}
            onChange={(e) => setSeo("description", e.target.value)} />
        </div>
      </section>

      {/* Footer */}
      <section className="border border-[#1e1e1e] bg-[#0d0d0d] p-6 space-y-4">
        <h2 className="text-xs font-mono tracking-widest uppercase text-[#c8ff00] pb-2">푸터</h2>
        <div>
          <label className={label}>저작권 표시</label>
          <input className={input} value={data.footer.copyright} onChange={(e) => setFooter("copyright", e.target.value)} />
        </div>
        <div>
          <label className={label}>연락처 표시</label>
          <input className={input} value={data.footer.contact} onChange={(e) => setFooter("contact", e.target.value)} />
        </div>
      </section>

      <button onClick={handleSave} disabled={status === "saving"}
        className="bg-[#c8ff00] text-[#080808] text-xs font-bold tracking-widest uppercase px-8 py-3 hover:bg-[#d4ff33] transition-colors disabled:opacity-50">
        {status === "saving" ? "저장 중..." : status === "saved" ? "저장됨 ✓" : status === "error" ? "오류 발생" : "저장"}
      </button>
    </div>
  );
}
