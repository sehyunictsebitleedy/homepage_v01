import { readData } from "@/lib/data";
import type { NavData } from "@/lib/types";
import NavForm from "./NavForm";

export default function AdminNavPage() {
  const data = readData<NavData>("nav.json");
  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-[clamp(1.5rem,3vw,2.5rem)] font-black tracking-tight text-[#f0f0f0]">Navigation</h1>
        <p className="mt-1 text-sm text-[#d1d1d1]">상단 내비게이션 메뉴 관리</p>
      </div>
      <NavForm initial={data} />
    </div>
  );
}
