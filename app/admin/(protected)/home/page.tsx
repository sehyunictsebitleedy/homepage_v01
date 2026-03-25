import { readData } from "@/lib/data";
import type { HomeData } from "@/lib/types";
import HomeForm from "./HomeForm";

export default function AdminHomePage() {
  const data = readData<HomeData>("home.json");
  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-[clamp(1.5rem,3vw,2.5rem)] font-black tracking-tight text-[#f0f0f0]">Home</h1>
        <p className="mt-1 text-sm text-[#d1d1d1]">메인 홈페이지 섹션 관리</p>
      </div>
      <HomeForm initial={data} />
    </div>
  );
}
