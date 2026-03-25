"use server";

import { writeData } from "@/lib/data";
import type { HomeData } from "@/lib/types";

export async function saveHome(data: HomeData): Promise<{ success: boolean; error?: string }> {
  try {
    writeData("home.json", data);
    return { success: true };
  } catch (e) {
    return { success: false, error: String(e) };
  }
}
