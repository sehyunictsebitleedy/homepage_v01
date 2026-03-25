import { readData } from "@/lib/data";
import type { CompanyData } from "@/lib/types";
import CompanyForm from "./CompanyForm";

export default function AdminCompanyPage() {
  const data = readData<CompanyData>("company.json");
  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-[clamp(1.5rem,3vw,2.5rem)] font-black tracking-tight text-[#f0f0f0]">Company</h1>
        <p className="mt-1 text-sm text-[#d1d1d1]">회사 소개 및 연혁 관리</p>
      </div>
      <CompanyForm initial={data} />
    </div>
  );
}
