import { readData } from "@/lib/data";
import type { PartnersData } from "@/lib/types";
import PartnersForm from "./PartnersForm";

export default function AdminPartnersPage() {
  const { partners } = readData<PartnersData>("partners.json");
  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="text-[clamp(1.5rem,3vw,2.5rem)] font-black tracking-tight text-[#f0f0f0]">
          Partners
        </h1>
        <p className="mt-1 text-sm text-[#d1d1d1]">협력사 마퀴 배너 관리</p>
      </div>
      <PartnersForm partners={partners} />
    </div>
  );
}
