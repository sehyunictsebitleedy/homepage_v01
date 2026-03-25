import { readData } from "@/lib/data";
import type { CompanyData } from "@/lib/types";
import CompanyContent from "./CompanyContent";

export default function CompanyPage() {
  const data = readData<CompanyData>("company.json");
  return <CompanyContent data={data} />;
}
