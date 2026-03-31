"use server";

import crypto from "crypto";
import { findUser, addUser, generateSalt, hashPassword } from "@/lib/users";
import type { AdminUser } from "@/lib/types";

interface RegisterState {
  error: string;
  success: boolean;
}

export async function registerAction(
  _prevState: RegisterState,
  formData: FormData
): Promise<RegisterState> {
  const username = formData.get("username")?.toString().trim() ?? "";
  const password = formData.get("password")?.toString() ?? "";
  const confirm = formData.get("confirm")?.toString() ?? "";
  const role = formData.get("role")?.toString() as "admin" | "editor";

  if (!username || !password) {
    return { error: "아이디와 비밀번호를 입력하세요.", success: false };
  }
  if (username.length < 3 || username.length > 20) {
    return { error: "아이디는 3~20자 사이여야 합니다.", success: false };
  }
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return { error: "아이디는 영문, 숫자, 언더스코어만 사용 가능합니다.", success: false };
  }
  if (password.length < 8) {
    return { error: "비밀번호는 8자 이상이어야 합니다.", success: false };
  }
  if (password !== confirm) {
    return { error: "비밀번호가 일치하지 않습니다.", success: false };
  }
  if (!["admin", "editor"].includes(role)) {
    return { error: "역할을 선택하세요.", success: false };
  }

  if (findUser(username)) {
    return { error: "이미 사용 중인 아이디입니다.", success: false };
  }

  const salt = generateSalt();
  const user: AdminUser = {
    id: crypto.randomUUID(),
    username,
    passwordHash: hashPassword(password, salt),
    passwordSalt: salt,
    role,
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  addUser(user);
  return { error: "", success: true };
}
