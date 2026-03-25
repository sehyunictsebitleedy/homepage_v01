import { readData } from "@/lib/data";
import type { ProjectData } from "@/lib/types";
import ProjectForm from "./ProjectForm";

export default function AdminProjectPage() {
  const data = readData<ProjectData>("project.json");
  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-[clamp(1.5rem,3vw,2.5rem)] font-black tracking-tight text-[#f0f0f0]">Project</h1>
        <p className="mt-1 text-sm text-[#d1d1d1]">주요 사업 현황 관리</p>
      </div>
      <ProjectForm initial={data} />
    </div>
  );
}
