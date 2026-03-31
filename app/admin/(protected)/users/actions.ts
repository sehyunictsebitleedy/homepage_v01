"use server";

import { revalidatePath } from "next/cache";
import { updateUser } from "@/lib/users";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

async function assertAdmin() {
  const session = await getSession();
  if (!session || (session.role !== "admin" && session.role !== "superadmin")) {
    redirect("/admin");
  }
}

export async function approveUserAction(formData: FormData): Promise<void> {
  await assertAdmin();
  const id = formData.get("id")?.toString() ?? "";
  const role = (formData.get("role")?.toString() ?? "editor") as "admin" | "editor";
  updateUser(id, { status: "active", role, approvedAt: new Date().toISOString() });
  revalidatePath("/admin/users");
}

export async function rejectUserAction(formData: FormData): Promise<void> {
  await assertAdmin();
  const id = formData.get("id")?.toString() ?? "";
  updateUser(id, { status: "disabled" });
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
