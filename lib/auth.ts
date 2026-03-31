import crypto from "crypto";
import { cookies } from "next/headers";
import type { UserRole } from "@/lib/types";

const SECRET = process.env.ADMIN_SECRET ?? "dev-secret-please-change-in-prod";
const ADMIN_USER = process.env.ADMIN_USER ?? "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "admin1234";
const SESSION_COOKIE = "admin_session";

export interface SessionUser {
  id: string;
  role: UserRole;
}

function sign(value: string): string {
  return crypto.createHmac("sha256", SECRET).update(value).digest("hex");
}

export function verifyCredentials(user: string, password: string): boolean {
  return user === ADMIN_USER && password === ADMIN_PASSWORD;
}

export function createToken(userId: string, role: string): string {
  const payload = `${userId}:${role}`;
  return `${payload}.${sign(payload)}`;
}

export function verifyToken(token: string): SessionUser | null {
  const dotIndex = token.lastIndexOf(".");
  if (dotIndex === -1) return null;
  const payload = token.slice(0, dotIndex);
  const sig = token.slice(dotIndex + 1);
  const expected = sign(payload);
  try {
    const ok = crypto.timingSafeEqual(
      Buffer.from(sig, "hex"),
      Buffer.from(expected, "hex")
    );
    if (!ok) return null;
  } catch {
    return null;
  }
  const colonIndex = payload.lastIndexOf(":");
  if (colonIndex === -1) return null;
  const id = payload.slice(0, colonIndex);
  const role = payload.slice(colonIndex + 1) as UserRole;
  return { id, role };
}

export async function getSession(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return verifyToken(token);
}

export async function setSession(userId: string, role: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, createToken(userId, role), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 8,
    path: "/",
  });
}

export async function clearSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}
