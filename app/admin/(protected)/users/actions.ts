"use server";

import { revalidatePath } from "next/cache";
import crypto from "crypto";
import { addUser, updateUser, removeUser, readUsers } from "@/lib/users";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import type { AdminUser } from "@/lib/types";

async function assertAdmin() {
  const session = await getSession();
  if (!session || (session.role !== "admin" && session.role !== "superadmin")) {
    redirect("/admin");
  }
}

export async function addUserAction(formData: FormData): Promise<void> {
  await assertAdmin();
  const worksId = formData.get("worksId")?.toString().trim() ?? "";
  const displayName = formData.get("displayName")?.toString().trim() ?? "";
  const role = (formData.get("role")?.toString() ?? "editor") as "admin" | "editor";

  if (!worksId) return;

  const existing = readUsers().find((u) => u.worksId === worksId);
  if (existing) return;

  const user: AdminUser = {
    id: crypto.randomUUID(),
    worksId,
    displayName: displayName || undefined,
    role,
    status: "active",
    createdAt: new Date().toISOString(),
  };
  addUser(user);
  revalidatePath("/admin/users");
}

export async function changeRoleAction(formData: FormData): Promise<void> {
  await assertAdmin();
  const id = formData.get("id")?.toString() ?? "";
  const role = (formData.get("role")?.toString() ?? "editor") as "admin" | "editor";
  updateUser(id, { role });
  revalidatePath("/admin/users");
}

export async function toggleStatusAction(formData: FormData): Promise<void> {
  await assertAdmin();
  const id = formData.get("id")?.toString() ?? "";
  const current = formData.get("status")?.toString() ?? "active";
  updateUser(id, { status: current === "active" ? "disabled" : "active" });
  revalidatePath("/admin/users");
}

export async function deleteUserAction(formData: FormData): Promise<void> {
  await assertAdmin();
  const id = formData.get("id")?.toString() ?? "";
  removeUser(id);
  revalidatePath("/admin/users");
}
