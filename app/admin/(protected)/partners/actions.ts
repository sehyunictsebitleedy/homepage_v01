"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth";
import { readData, writeData } from "@/lib/data";
import type { PartnersData, PartnerItem } from "@/lib/types";

export async function savePartnersAction(formData: FormData) {
  const session = await getSession();
  if (!session) {
    throw new Error("Unauthorized");
  }

  const { partners } = readData<PartnersData>("partners.json");

  const action = formData.get("action") as string;

  if (action === "add") {
    const name = (formData.get("name") as string).trim();
    if (!name) return;
    const newItem: PartnerItem = {
      id: Date.now().toString(),
      name,
    };
    writeData<PartnersData>("partners.json", { partners: [...partners, newItem] });
  }

  if (action === "delete") {
    const id = formData.get("id") as string;
    writeData<PartnersData>("partners.json", {
      partners: partners.filter((p) => p.id !== id),
    });
  }

  revalidatePath("/");
  revalidatePath("/admin/partners");
}
