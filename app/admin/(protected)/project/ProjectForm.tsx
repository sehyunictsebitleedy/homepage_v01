"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import type { ProjectData, Project } from "@/lib/types";
import { saveProject } from "./actions";

const inputCls = "w-full bg-[#080808] border border-[#1e1e1e] text-[#f0f0f0] text-sm px-3 py-2 outline-none focus:border-[#c8ff00] transition-colors";

const TAGS = ["GIS", "CAD", "IT"];

export default function ProjectForm({ initial }: { initial: ProjectData }) {
  const [data, setData] = useState<ProjectData>(initial);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  const update = (i: number, patch: Partial<Project>) =>
    setData((d) => ({ projects: d.projects.map((p, idx) => idx === i ? { ...p, ...patch } : p) }));

  const add = () =>
    setData((d) => ({
      projects: [...d.projects, { title: "", client: "", year: String(new Date().getFullYear()), tag: "GIS" }]
    }));

  const remove = (i: number) =>
    setData((d) => ({ projects: d.projects.filter((_, idx) => idx !== i) }));

  const handleSave = async () => {
    setStatus("saving");
    const res = await saveProject(data);
    setStatus(res.success ? "saved" : "error");
    if (res.success) setTimeout(() => setStatus("idle"), 2000);
  };

  return (
    <div className="max-w-3xl space-y-3">
      {/* Header row */}
      <div className="hidden md:grid grid-cols-[1fr_1fr_80px_80px_32px] gap-2 px-4 pb-1">
        {["프로젝트명", "클라이언트", "연도", "태그", ""].map((h) => (
          <span key={h} className="text-[10px] font-mono tracking-widest uppercase text-[#555]">{h}</span>
        ))}
      </div>

      {data.projects.map((p, i) => (
        <div key={i} className="border border-[#1e1e1e] bg-[#0d0d0d] p-3 grid grid-cols-1 md:grid-cols-[1fr_1fr_80px_80px_32px] gap-2 items-center">
          <input className={inputCls} placeholder="프로젝트명" value={p.title}
            onChange={(e) => update(i, { title: e.target.value })} />
          <input className={inputCls} placeholder="클라이언트" value={p.client}
            onChange={(e) => update(i, { client: e.target.value })} />
          <input className={inputCls} placeholder="연도" value={p.year}
            onChange={(e) => update(i, { year: e.target.value })} />
          <select
            className={inputCls + " cursor-pointer"}
            value={p.tag}
            onChange={(e) => update(i, { tag: e.target.value })}
          >
            {TAGS.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          <button onClick={() => remove(i)}
            className="text-[#555] hover:text-[#ff3cac] transition-colors justify-self-center">
            <Trash2 size={14} />
          </button>
        </div>
      ))}

      <button onClick={add}
        className="w-full border border-dashed border-[#1e1e1e] py-3 text-xs text-[#a1a1a1] hover:text-[#c8ff00] hover:border-[#c8ff00]/40 transition-colors flex items-center justify-center gap-2">
        <Plus size={13} /> 프로젝트 추가
      </button>

      <div className="pt-2">
        <SaveButton status={status} onClick={handleSave} />
      </div>
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
