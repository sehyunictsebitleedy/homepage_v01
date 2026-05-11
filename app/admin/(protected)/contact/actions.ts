"use server";

import { getSession } from "@/lib/auth";
import { writeData } from "@/lib/data";
import type { ContactData } from "@/lib/types";

export async function saveContact(data: ContactData): Promise<{ success: boolean; error?: string }> {
  const session = await getSession();
  if (!session) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    writeData("contact.json", data);
    return { success: true };
  } catch (e) {
    return { success: false, error: String(e) };
  }
}
