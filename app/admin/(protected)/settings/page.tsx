import { readData } from "@/lib/data";
import type { SiteData } from "@/lib/types";
import SettingsForm from "./SettingsForm";

export default function AdminSettingsPage() {
  const data = readData<SiteData>("site.json");
  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-[clamp(1.5rem,3vw,2.5rem)] font-black tracking-tight text-[#f0f0f0]">Settings</h1>
        <p className="mt-1 text-sm text-[#d1d1d1]">사이트명 · SEO · 푸터 · 기본 정보</p>
      </div>
      <SettingsForm initial={data} />
    </div>
  );
}
