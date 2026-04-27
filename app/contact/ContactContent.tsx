"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, MapPin, Mail, Clock } from "lucide-react";
import type { ContactData } from "@/lib/types";

const FIELDS_INIT = { name: "", company: "", tel: "", email: "", message: "" };
const AREAS = ["GIS / CAD", "공공데이터", "AI 솔루션", "모바일 앱", "웹 시스템", "기타"];

export default function ContactContent({ data }: { data: ContactData }) {
  const INFO = [
    { icon: Phone, label: "Tel", value: data.tel },
    { icon: Mail, label: "Email", value: data.email },
    { icon: MapPin, label: "Address", value: data.address },
    { icon: Clock, label: "Hours", value: "평일 09:00 – 18:00" },
  ];

  const [fields, setFields] = useState(FIELDS_INIT);
  const [areas, setAreas] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  const set = (k: keyof typeof FIELDS_INIT) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFields((f) => ({ ...f, [k]: e.target.value }));

  const toggleArea = (a: string) =>
    setAreas((prev) => prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fields.name || !fields.company || !fields.tel || !fields.message) return;
    setStatus("sending");
    try {
      const emails = (data.inquiryEmails ?? []).filter(Boolean);
      const target = emails[0] || data.inquiryEmail || "leedy@sehyunict.com";
      const cc = emails.slice(1).join(",");
      const res = await fetch(`https://formsubmit.co/ajax/${target}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: fields.name,
          company: fields.company,
          tel: fields.tel,
          email: fields.email || "-",
          area: areas.join(", ") || "미선택",
          message: fields.message,
          _subject: `[세현ICT 문의] ${fields.company} / ${fields.name}`,
          _captcha: "false",
          _template: "table",
          ...(cc ? { _cc: cc } : {}),
        }),
      });
      const json = await res.json();
      console.log("FormSubmit response:", json);
      setStatus(json.success === "true" || json.success === true ? "done" : "error");
      if (json.success === "true" || json.success === true) {
        setFields(FIELDS_INIT);
        setAreas([]);
      }
    } catch (err) {
      console.error("FormSubmit error:", err);
      setStatus("error");
    }
  };

  const inputCls = "w-full bg-transparent text-[#f0f0f0] text-base outline-none placeholder:text-[#333] border-b border-[#343434] pb-2 focus:border-[#c8ff00] transition-colors";
  const labelCls = "block font-mono text-[10px] tracking-[0.25em] uppercase text-[#aaa] mb-3";

  return (
    <div className="min-h-screen px-6 md:px-12 pt-12 pb-24">
      {/* 헤더 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mb-16"
      >
        <p className="font-mono text-xs tracking-[0.3em] uppercase text-[#c8ff00] mb-4">✦ Contact</p>
        <h1 className="font-black tracking-[-0.04em] leading-[0.9] text-[clamp(3rem,8vw,7rem)] text-[#f0f0f0]">
          GET IN<br />TOUCH
        </h1>
      </motion.div>

      {/* 지도 + Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.7 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-[#343434] mb-24"
      >
        <div className="relative" style={{ minHeight: 320 }}>
          <iframe
            src={data.mapEmbedUrl || `https://www.openstreetmap.org/export/embed.html?bbox=127.0821%2C37.2047%2C127.1021%2C37.2147&layer=mapnik&marker=37.2097454%2C127.0921059`}
            className="w-full h-full border-0 absolute inset-0"
            style={{ minHeight: 320 }}
            loading="lazy"
            allowFullScreen
          />
        </div>
        <div className="border-t lg:border-t-0 lg:border-l border-[#343434] p-8 flex flex-col justify-between gap-6">
          <div>
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#c8ff00] mb-6">— Location &amp; Info</p>
            <div className="divide-y divide-[#343434]">
              {INFO.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-4 py-5">
                  <div className="w-7 h-7 border border-[#343434] flex items-center justify-center shrink-0 mt-0.5">
                    <Icon size={12} className="text-[#c8ff00]" />
                  </div>
                  <div>
                    <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#666] mb-1">{label}</p>
                    <p className="text-sm text-[#ddd9d9] leading-relaxed">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <a
              href={`https://map.kakao.com/link/map/${encodeURIComponent(data.mapQuery || data.address)},37.2097454,127.0921059`}
              target="_blank" rel="noopener noreferrer"
              className="font-mono text-[10px] tracking-widest uppercase text-[#c8ff00] hover:text-[#d4ff33] transition-colors border border-[#343434] px-3 py-1.5 hover:border-[#c8ff00]"
            >카카오맵 ↗</a>
            <a
              href={`https://map.naver.com/p/search/${encodeURIComponent(data.mapQuery || data.address)}`}
              target="_blank" rel="noopener noreferrer"
              className="font-mono text-[10px] tracking-widest uppercase text-[#c8ff00] hover:text-[#d4ff33] transition-colors border border-[#343434] px-3 py-1.5 hover:border-[#c8ff00]"
            >네이버지도 ↗</a>
          </div>
        </div>
      </motion.div>

      {/* 상담 접수 폼 */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.7 }}
      >
        <div className="mb-10">
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-[#c8ff00] mb-4">✦ Consultation</p>
          <h2 className="font-black tracking-[-0.03em] leading-[0.95] text-[clamp(2.5rem,6vw,5rem)] text-[#f0f0f0]">
            <span className="text-outline">PROJECT</span> REQUEST<br />
            <span className="text-[#c8ff00]">FORM</span>
          </h2>
          <p className="mt-4 text-sm text-[#b5b5b5] max-w-lg leading-relaxed">
            GIS·CAD, 공공데이터, AI 솔루션 등 IT 프로젝트 전반에 대한 상담을 접수해 드립니다.<br />
            접수 후 1영업일 내 담당자가 연락드립니다.
          </p>
        </div>

        {/* 완료 메시지 */}
        {status === "done" && (
          <div className="border border-[#c8ff00] bg-[#c8ff0010] p-6 mb-8 font-mono text-sm text-[#c8ff00] tracking-wider">
            ✓ 문의가 접수되었습니다. 1영업일 내 담당자가 연락드립니다.
          </div>
        )}
        {status === "error" && (
          <div className="border border-[#ff3cac] bg-[#ff3cac10] p-6 mb-8 font-mono text-sm text-[#ff3cac] tracking-wider">
            ✗ 전송에 실패했습니다. 잠시 후 다시 시도하거나 이메일로 직접 문의해 주세요.
          </div>
        )}

        <form className="border border-[#343434]" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="border-b border-r-0 md:border-r border-[#343434] p-6">
              <label className={labelCls}>담당자명 *</label>
              <input type="text" className={inputCls} placeholder="홍길동" value={fields.name} onChange={set("name")} required />
            </div>
            <div className="border-b border-[#343434] p-6">
              <label className={labelCls}>회사명 *</label>
              <input type="text" className={inputCls} placeholder="(주)회사명" value={fields.company} onChange={set("company")} required />
            </div>
            <div className="border-b border-r-0 md:border-r border-[#343434] p-6">
              <label className={labelCls}>연락처 *</label>
              <input type="tel" className={inputCls} placeholder="010-0000-0000" value={fields.tel} onChange={set("tel")} required />
            </div>
            <div className="border-b border-[#343434] p-6">
              <label className={labelCls}>이메일</label>
              <input type="email" className={inputCls} placeholder="email@example.com" value={fields.email} onChange={set("email")} />
            </div>

            <div className="border-b border-[#343434] p-6 md:col-span-2">
              <label className={labelCls}>상담 분야</label>
              <div className="flex flex-wrap gap-2">
                {AREAS.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleArea(tag)}
                    className={`font-mono text-[11px] tracking-widest uppercase border px-3 py-1.5 transition-colors ${areas.includes(tag) ? "border-[#c8ff00] text-[#c8ff00]" : "border-[#343434] text-[#666] hover:border-[#444] hover:text-[#aaa]"}`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-b border-[#343434] p-6 md:col-span-2">
              <label className={labelCls}>문의 내용 *</label>
              <textarea
                rows={6}
                className="w-full bg-transparent text-[#f0f0f0] text-sm outline-none placeholder:text-[#333] resize-none focus:placeholder:text-[#444] transition-colors leading-relaxed"
                placeholder="프로젝트 개요, 요구사항, 예산 규모, 일정 등을 자유롭게 적어주세요."
                value={fields.message}
                onChange={set("message")}
                required
              />
            </div>

            <div className="p-6 md:col-span-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p className="font-mono text-[10px] tracking-wider text-[#444]">* 표시 항목은 필수 입력입니다</p>
              <button
                type="submit"
                disabled={status === "sending"}
                className="group flex items-center gap-3 bg-[#c8ff00] text-[#080808] text-xs font-black tracking-[0.2em] uppercase px-10 py-4 hover:bg-[#d4ff33] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "sending" ? "전송 중..." : "상담 접수"}
                {status !== "sending" && <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>}
              </button>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
