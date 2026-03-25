"use server";

import { writeData } from "@/lib/data";
import type { NavData } from "@/lib/types";

export async function saveNav(data: NavData): Promise<{ success: boolean; error?: string }> {
  try {
    writeData("nav.json", data);
    return { success: true };
  } catch (e) {
    return { success: false, error: String(e) };
  }
}
