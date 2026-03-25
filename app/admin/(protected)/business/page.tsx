import { readData } from "@/lib/data";
import type { BusinessData } from "@/lib/types";
import BusinessForm from "./BusinessForm";

export default function AdminBusinessPage() {
  const data = readData<BusinessData>("business.json");
  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-[clamp(1.5rem,3vw,2.5rem)] font-black tracking-tight text-[#f0f0f0]">Business</h1>
        <p className="mt-1 text-sm text-[#d1d1d1]">사업 영역 및 협력사 관리</p>
      </div>
      <BusinessForm initial={data} />
    </div>
  );
}
