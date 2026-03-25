import { readData } from "@/lib/data";
import type { BusinessData } from "@/lib/types";
import BusinessContent from "./BusinessContent";

export default function BusinessPage() {
  const data = readData<BusinessData>("business.json");
  return <BusinessContent data={data} />;
}
