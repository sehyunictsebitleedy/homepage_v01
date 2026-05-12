"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth";
import { writeData } from "@/lib/data";
import type { NavData } from "@/lib/types";

export async function saveNav(data: NavData): Promise<{ success: boolean; error?: string }> {
  const session = await getSession();
  if (!session) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    writeData("nav.json", data);
    revalidatePath("/", "layout");
    return { success: true };
  } catch (e) {
    return { success: false, error: String(e) };
  }
}
