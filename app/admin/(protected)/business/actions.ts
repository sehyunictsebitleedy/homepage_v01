"use server";

import { writeData } from "@/lib/data";
import type { BusinessData } from "@/lib/types";

export async function saveBusiness(data: BusinessData): Promise<{ success: boolean; error?: string }> {
  try {
    writeData("business.json", data);
    return { success: true };
  } catch (e) {
    return { success: false, error: String(e) };
  }
}
