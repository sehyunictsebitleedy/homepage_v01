"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import type { ProjectData, ProjectYear, ProjectItem } from "@/lib/types";
import { saveProject } from "./actions";

const inputCls = "w-full bg-[#080808] border border-[#1e1e1e] text-[#f0f0f0] text-sm px-3 py-2 outline-none focus:border-[#c8ff00] transition-colors";
const TAGS = ["GIS", "CAD", "Mobile", "SI", "IT", "유지보수", "인증", "특허", "인프라"];

export default function ProjectForm({ initial }: { initial: ProjectData }) {
  const [data, setData] = useState<ProjectData>(initial);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  const setYears = (years: ProjectYear[]) => setData({ years });

  const updateYear = (yi: number, value: string) =>
    setYears(data.years.map((y, i) => i === yi ? { ...y, year: value } : y));

  const updateProject = (yi: number, pi: number, patch: Partial<ProjectItem>) =>
    setYears(data.years.map((y, i) =>
      i === yi ? { ...y, projects: y.projects.map((p, j) => j === pi ? { ...p, ...patch } : p) } : y
    ));

  const addProject = (yi: number) =>
    setYears(data.years.map((y, i) =>
      i === yi ? { ...y, projects: [...y.projects, { title: "", client: "", tag: "GIS" }] } : y
    ));

  const removeProject = (yi: number, pi: number) =>
    setYears(data.years.map((y, i) =>
      i === yi ? { ...y, projects: y.projects.filter((_, j) => j !== pi) } : y
    ));

  const addYear = () =>
    setYears([{ year: String(new Date().getFullYear()), projects: [{ title: "", client: "", tag: "GIS" }] }, ...data.years]);

  const removeYear = (yi: number) =>
    setYears(data.years.filter((_, i) => i !== yi));

  const handleSave = async () => {
    setStatus("saving");
    const res = await saveProject(data);
    setStatus(res.success ? "saved" : "error");
    if (res.success) setTimeout(() => setStatus("idle"), 2000);
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex justify-between items-center">
        <button onClick={addYear}
          className="flex items-center gap-1.5 text-xs text-[#a1a1a1] hover:text-[#c8ff00] transition-colors border border-dashed border-[#1e1e1e] hover:border-[#c8ff00]/40 px-4 py-2">
          <Plus size={13} /> 연도 추가
        </button>
        <SaveButton status={status} onClick={handleSave} />
      </div>

      {data.years.map((y, yi) => (
        <div key={yi} className="border border-[#1e1e1e] bg-[#0d0d0d] p-4 space-y-3">
          {/* 연도 헤더 */}
          <div className="flex items-center gap-3">
            <input
              className="w-20 shrink-0 bg-[#080808] border border-[#1e1e1e] text-[#c8ff00] text-sm font-bold px-3 py-1.5 outline-none focus:border-[#c8ff00] transition-colors"
              value={y.year}
              onChange={(e) => updateYear(yi, e.target.value)}
            />
            <span className="text-[10px] font-mono text-[#555] tracking-widest flex-1">YEAR</span>
            <button onClick={() => removeYear(yi)}
              className="text-[#333] hover:text-[#ff3cac] transition-colors">
              <Trash2 size={14} />
            </button>
          </div>

          {/* 프로젝트 목록 */}
          <div className="space-y-2 pl-2 border-l border-[#1e1e1e]">
            {y.projects.map((p, pi) => (
              <div key={pi} className="grid grid-cols-1 md:grid-cols-[1fr_1fr_90px_32px] gap-2 items-center">
                <input className={inputCls} placeholder="프로젝트명" value={p.title}
                  onChange={(e) => updateProject(yi, pi, { title: e.target.value })} />
                <input className={inputCls} placeholder="클라이언트" value={p.client}
                  onChange={(e) => updateProject(yi, pi, { client: e.target.value })} />
                <select className={inputCls + " cursor-pointer"} value={p.tag}
                  onChange={(e) => updateProject(yi, pi, { tag: e.target.value })}>
                  {TAGS.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
                <button onClick={() => removeProject(yi, pi)}
                  className="text-[#333] hover:text-[#ff3cac] transition-colors justify-self-center">
                  <Trash2 size={13} />
                </button>
              </div>
            ))}
            <button onClick={() => addProject(yi)}
              className="flex items-center gap-1 text-[10px] text-[#555] hover:text-[#c8ff00] transition-colors mt-1">
              <Plus size={11} /> 프로젝트 추가
            </button>
          </div>
        </div>
      ))}
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
