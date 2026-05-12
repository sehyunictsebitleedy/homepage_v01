"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth";
import { writeData } from "@/lib/data";
import type { BusinessData } from "@/lib/types";

export async function saveBusiness(data: BusinessData): Promise<{ success: boolean; error?: string }> {
  const session = await getSession();
  if (!session) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    writeData("business.json", data);
    revalidatePath("/", "layout");
    return { success: true };
  } catch (e) {
    return { success: false, error: String(e) };
  }
}
