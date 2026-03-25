import { readData } from "@/lib/data";
import type { ContactData } from "@/lib/types";
import ContactForm from "./ContactForm";

export default function AdminContactPage() {
  const data = readData<ContactData>("contact.json");
  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-[clamp(1.5rem,3vw,2.5rem)] font-black tracking-tight text-[#f0f0f0]">Contact</h1>
        <p className="mt-1 text-sm text-[#d1d1d1]">연락처 및 오시는 길 관리</p>
      </div>
      <ContactForm initial={data} />
    </div>
  );
}
