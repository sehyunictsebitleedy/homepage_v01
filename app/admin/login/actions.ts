"use server";

import { redirect } from "next/navigation";
import { verifyCredentials, setSession } from "@/lib/auth";
import { findUser, verifyPassword } from "@/lib/users";

interface LoginState {
  error: string;
}

export async function loginAction(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const username = formData.get("username")?.toString() ?? "";
  const password = formData.get("password")?.toString() ?? "";

  // 슈퍼어드민 (환경변수) 체크
  if (verifyCredentials(username, password)) {
    await setSession("superadmin", "superadmin");
    redirect("/admin");
  }

  // users.json 사용자 체크
  const user = findUser(username);
  if (!user) {
    return { error: "아이디 또는 비밀번호가 올바르지 않습니다." };
  }
  if (user.status === "pending") {
    return { error: "계정 승인 대기 중입니다. 관리자에게 문의하세요." };
  }
  if (user.status === "disabled") {
    return { error: "비활성화된 계정입니다. 관리자에게 문의하세요." };
  }
  if (!verifyPassword(password, user.passwordSalt, user.passwordHash)) {
    return { error: "아이디 또는 비밀번호가 올바르지 않습니다." };
  }

  await setSession(user.id, user.role);
  redirect("/admin");
}
