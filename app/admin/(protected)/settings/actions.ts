"use server";

import { writeData } from "@/lib/data";
import type { SiteData } from "@/lib/types";

export async function saveSite(data: SiteData): Promise<{ success: boolean; error?: string }> {
  try {
    writeData("site.json", data);
    return { success: true };
  } catch (e) {
    return { success: false, error: String(e) };
  }
}
