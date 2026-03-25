"use server";

import { writeData } from "@/lib/data";
import type { ProjectData } from "@/lib/types";

export async function saveProject(data: ProjectData): Promise<{ success: boolean; error?: string }> {
  try {
    writeData("project.json", data);
    return { success: true };
  } catch (e) {
    return { success: false, error: String(e) };
  }
}
