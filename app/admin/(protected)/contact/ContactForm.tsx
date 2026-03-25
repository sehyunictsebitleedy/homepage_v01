"use client";

import { useState } from "react";
import type { ContactData } from "@/lib/types";
import { saveContact } from "./actions";

const inputCls = "w-full bg-[#080808] border border-[#1e1e1e] text-[#f0f0f0] text-sm px-3 py-2 outline-none focus:border-[#c8ff00] transition-colors";
const labelCls = "block text-[10px] font-mono tracking-widest uppercase text-[#a1a1a1] mb-1";

export default function ContactForm({ initial }: { initial: ContactData }) {
  const [data, setData] = useState<ContactData>(initial);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  const set = (key: keyof ContactData, value: string) =>
    setData((d) => ({ ...d, [key]: value }));

  const handleSave = async () => {
    setStatus("saving");
    const res = await saveContact(data);
    setStatus(res.success ? "saved" : "error");
    if (res.success) setTimeout(() => setStatus("idle"), 2000);
  };

  return (
    <div className="max-w-lg space-y-6">
      <section className="border border-[#1e1e1e] bg-[#0d0d0d] p-6 space-y-4">
        <h2 className="text-xs font-mono tracking-widest uppercase text-[#c8ff00] mb-4">연락처 정보</h2>
        <div>
          <label className={labelCls}>전화번호 (Tel)</label>
          <input className={inputCls} value={data.tel}
            onChange={(e) => set("tel", e.target.value)} />
        </div>
        <div>
          <label className={labelCls}>이메일 (Email)</label>
          <input type="email" className={inputCls} value={data.email}
            onChange={(e) => set("email", e.target.value)} />
        </div>
        <div>
          <label className={labelCls}>주소 (Address)</label>
          <input className={inputCls} value={data.address}
            onChange={(e) => set("address", e.target.value)} />
        </div>
      </section>

      <button
        onClick={handleSave}
        disabled={status === "saving"}
        className="bg-[#c8ff00] text-[#080808] text-xs font-bold tracking-widest uppercase px-8 py-3 hover:bg-[#d4ff33] transition-colors disabled:opacity-50"
      >
        {status === "saving" ? "저장 중..." : status === "saved" ? "저장됨 ✓" : status === "error" ? "오류 발생" : "저장"}
      </button>
    </div>
  );
}
