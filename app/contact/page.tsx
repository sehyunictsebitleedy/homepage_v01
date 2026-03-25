import { readData } from "@/lib/data";
import type { ContactData } from "@/lib/types";
import ContactContent from "./ContactContent";

export default function ContactPage() {
  const data = readData<ContactData>("contact.json");
  return <ContactContent data={data} />;
}
