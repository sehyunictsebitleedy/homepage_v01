"use server";

import { redirect } from "next/navigation";
import { verifyCredentials, setSession } from "@/lib/auth";

interface LoginState {
  error: string;
}

export async function loginAction(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const username = formData.get("username")?.toString() ?? "";
  const password = formData.get("password")?.toString() ?? "";

  if (!verifyCredentials(username, password)) {
    return { error: "아이디 또는 비밀번호가 올바르지 않습니다." };
  }

  await setSession();
  redirect("/admin");
}
