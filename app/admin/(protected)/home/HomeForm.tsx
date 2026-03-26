"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import type { HomeData, HomeServiceItem } from "@/lib/types";
import { saveHome } from "./actions";

const input = "w-full bg-[#080808] border border-[#1e1e1e] text-[#f0f0f0] text-sm px-3 py-2 outline-none focus:border-[#c8ff00] transition-colors";
const label = "block text-[10px] font-mono tracking-widest uppercase text-[#a1a1a1] mb-1";
const section = "border border-[#1e1e1e] bg-[#0d0d0d] p-6 space-y-4";

function SaveButton({ status, onClick }: { status: string; onClick: () => void }) {
  return (
    <button onClick={onClick} disabled={status === "saving"}
      className="bg-[#c8ff00] text-[#080808] text-xs font-bold tracking-widest uppercase px-8 py-3 hover:bg-[#d4ff33] transition-colors disabled:opacity-50">
      {status === "saving" ? "저장 중..." : status === "saved" ? "저장됨 ✓" : status === "error" ? "오류 발생" : "저장"}
    </button>
  );
}

export default function HomeForm({ initial }: { initial: HomeData }) {
  const [data, setData] = useState<HomeData>(initial);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  const setHero = (k: keyof HomeData["hero"], v: string) =>
    setData((d) => ({ ...d, hero: { ...d.hero, [k]: v } }));
  const setAbout = (k: keyof HomeData["about"], v: string) =>
    setData((d) => ({ ...d, about: { ...d.about, [k]: v } }));
  const setCta = (k: keyof HomeData["cta"], v: string) =>
    setData((d) => ({ ...d, cta: { ...d.cta, [k]: v } }));

  const updateService = (i: number, patch: Partial<HomeServiceItem>) =>
    setData((d) => ({ ...d, services: d.services.map((s, idx) => idx === i ? { ...s, ...patch } : s) }));
  const addService = () =>
    setData((d) => ({
      ...d,
      services: [...d.services, { num: String(d.services.length + 1).padStart(2, "0"), title: "", desc: "", href: "/" }]
    }));
  const removeService = (i: number) =>
    setData((d) => ({ ...d, services: d.services.filter((_, idx) => idx !== i) }));

  const handleSave = async () => {
    setStatus("saving");
    const res = await saveHome(data);
    setStatus(res.success ? "saved" : "error");
    if (res.success) setTimeout(() => setStatus("idle"), 2000);
  };

  return (
    <div className="max-w-2xl space-y-6">
      {/* Hero */}
      <section className={section}>
        <h2 className="text-xs font-mono tracking-widest uppercase text-[#c8ff00] pb-2">Hero 섹션</h2>
        <div className="grid grid-cols-2 gap-3">
          <div><label className={label}>타이틀 1</label><input className={input} value={data.hero.title1} onChange={(e) => setHero("title1", e.target.value)} /></div>
          <div><label className={label}>타이틀 2</label><input className={input} value={data.hero.title2} onChange={(e) => setHero("title2", e.target.value)} /></div>
        </div>
        <div><label className={label}>태그라인</label><input className={input} value={data.hero.tagline} onChange={(e) => setHero("tagline", e.target.value)} /></div>
        <div><label className={label}>설명 (줄바꿈: \n)</label><textarea rows={2} className={input + " resize-none"} value={data.hero.description} onChange={(e) => setHero("description", e.target.value)} /></div>
        <div className="grid grid-cols-[1fr_1fr_auto] gap-3 items-end">
          <div><label className={label}>버튼1 텍스트</label><input className={input} value={data.hero.btn1Label} onChange={(e) => setHero("btn1Label", e.target.value)} /></div>
          <div><label className={label}>버튼1 링크</label><input className={input} value={data.hero.btn1Href} onChange={(e) => setHero("btn1Href", e.target.value)} /></div>
          <div>
            <label className={label}>창</label>
            <div className="flex border border-[#1e1e1e] overflow-hidden">
              {(["_self", "_blank"] as const).map((t) => (
                <button key={t} type="button"
                  onClick={() => setHero("btn1Target", t)}
                  className={`px-2.5 py-2 text-[10px] font-mono tracking-widest uppercase transition-colors ${data.hero.btn1Target === t ? "bg-[#c8ff00] text-[#080808]" : "bg-[#080808] text-[#555] hover:text-[#a1a1a1]"}`}>
                  {t === "_self" ? "현재" : "새창"}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-[1fr_1fr_auto] gap-3 items-end">
          <div><label className={label}>버튼2 텍스트</label><input className={input} value={data.hero.btn2Label} onChange={(e) => setHero("btn2Label", e.target.value)} /></div>
          <div><label className={label}>버튼2 링크</label><input className={input} value={data.hero.btn2Href} onChange={(e) => setHero("btn2Href", e.target.value)} /></div>
          <div>
            <label className={label}>창</label>
            <div className="flex border border-[#1e1e1e] overflow-hidden">
              {(["_self", "_blank"] as const).map((t) => (
                <button key={t} type="button"
                  onClick={() => setHero("btn2Target", t)}
                  className={`px-2.5 py-2 text-[10px] font-mono tracking-widest uppercase transition-colors ${data.hero.btn2Target === t ? "bg-[#c8ff00] text-[#080808]" : "bg-[#080808] text-[#555] hover:text-[#a1a1a1]"}`}>
                  {t === "_self" ? "현재" : "새창"}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className={section}>
        <div className="flex items-center justify-between pb-2">
          <h2 className="text-xs font-mono tracking-widest uppercase text-[#c8ff00]">Services 카드</h2>
          <button onClick={addService} className="flex items-center gap-1.5 text-xs text-[#a1a1a1] hover:text-[#c8ff00] transition-colors">
            <Plus size={13} /> 추가
          </button>
        </div>
        <div className="space-y-3">
          {data.services.map((s, i) => (
            <div key={i} className="grid grid-cols-[48px_1fr_1fr_80px_28px] gap-2 items-center">
              <input className={input} value={s.num} onChange={(e) => updateService(i, { num: e.target.value })} placeholder="번호" />
              <input className={input} value={s.title} onChange={(e) => updateService(i, { title: e.target.value })} placeholder="제목" />
              <input className={input} value={s.desc} onChange={(e) => updateService(i, { desc: e.target.value })} placeholder="설명" />
              <input className={input} value={s.href} onChange={(e) => updateService(i, { href: e.target.value })} placeholder="링크" />
              <button onClick={() => removeService(i)} className="text-[#555] hover:text-[#ff3cac] transition-colors">
                <Trash2 size={13} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section className={section}>
        <h2 className="text-xs font-mono tracking-widest uppercase text-[#c8ff00] pb-2">About 섹션</h2>
        <div>
          <label className={label}>텍스트 (**굵게** → 라임 강조)</label>
          <textarea rows={3} className={input + " resize-none"} value={data.about.text} onChange={(e) => setAbout("text", e.target.value)} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div><label className={label}>링크 텍스트</label><input className={input} value={data.about.linkLabel} onChange={(e) => setAbout("linkLabel", e.target.value)} /></div>
          <div><label className={label}>링크 URL</label><input className={input} value={data.about.linkHref} onChange={(e) => setAbout("linkHref", e.target.value)} /></div>
        </div>
      </section>

      {/* CTA */}
      <section className={section}>
        <h2 className="text-xs font-mono tracking-widest uppercase text-[#c8ff00] pb-2">CTA 섹션</h2>
        <div><label className={label}>태그라인</label><input className={input} value={data.cta.tagline} onChange={(e) => setCta("tagline", e.target.value)} /></div>
        <div className="grid grid-cols-2 gap-3">
          <div><label className={label}>타이틀 1</label><input className={input} value={data.cta.title1} onChange={(e) => setCta("title1", e.target.value)} /></div>
          <div><label className={label}>타이틀 2</label><input className={input} value={data.cta.title2} onChange={(e) => setCta("title2", e.target.value)} /></div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div><label className={label}>버튼 텍스트</label><input className={input} value={data.cta.btnLabel} onChange={(e) => setCta("btnLabel", e.target.value)} /></div>
          <div><label className={label}>버튼 링크</label><input className={input} value={data.cta.btnHref} onChange={(e) => setCta("btnHref", e.target.value)} /></div>
        </div>
      </section>

      <SaveButton status={status} onClick={handleSave} />
    </div>
  );
}
