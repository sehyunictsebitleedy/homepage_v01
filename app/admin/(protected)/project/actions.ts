"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth";
import { writeData } from "@/lib/data";
import type { ProjectData } from "@/lib/types";

export async function saveProject(data: ProjectData): Promise<{ success: boolean; error?: string }> {
  const session = await getSession();
  if (!session) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    writeData("project.json", data);
    revalidatePath("/", "layout");
    return { success: true };
  } catch (e) {
    return { success: false, error: String(e) };
  }
}
