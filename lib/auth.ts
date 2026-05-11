import crypto from "crypto";
import { cookies } from "next/headers";
import type { UserRole } from "@/lib/types";

const SECRET = process.env.ADMIN_SECRET;
const ADMIN_USER = process.env.ADMIN_USER;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const SESSION_COOKIE = "admin_session";
const SESSION_TTL_MS = 8 * 60 * 60 * 1000; // 8시간

if (!SECRET || !ADMIN_USER || !ADMIN_PASSWORD) {
  throw new Error(
    "[auth] ADMIN_SECRET, ADMIN_USER, ADMIN_PASSWORD must be set in environment variables"
  );
}

export interface SessionUser {
  id: string;
  role: UserRole;
}

function sign(value: string): string {
  return crypto.createHmac("sha256", SECRET as string).update(value).digest("hex");
}

function safeEqualString(a: string, b: string): boolean {
  // 길이가 다르면 timingSafeEqual이 throw하므로 길이를 맞춰서 비교한 뒤
  // 마지막에 길이 일치 여부도 함께 평가한다.
  const maxLen = Math.max(a.length, b.length, 1);
  const aBuf = Buffer.alloc(maxLen);
  const bBuf = Buffer.alloc(maxLen);
  aBuf.write(a);
  bBuf.write(b);
  const eq = crypto.timingSafeEqual(aBuf, bBuf);
  return eq && a.length === b.length;
}

export function verifyCredentials(user: string, password: string): boolean {
  const userMatch = safeEqualString(user, ADMIN_USER as string);
  const passMatch = safeEqualString(password, ADMIN_PASSWORD as string);
  return userMatch && passMatch;
}

export function createToken(userId: string, role: string): string {
  const expiresAt = Date.now() + SESSION_TTL_MS;
  const payload = `${userId}:${role}:${expiresAt}`;
  return `${payload}.${sign(payload)}`;
}

export function verifyToken(token: string): SessionUser | null {
  const dotIndex = token.lastIndexOf(".");
  if (dotIndex === -1) return null;
  const payload = token.slice(0, dotIndex);
  const sig = token.slice(dotIndex + 1);
  const expected = sign(payload);

  try {
    const sigBuf = Buffer.from(sig, "hex");
    const expBuf = Buffer.from(expected, "hex");
    if (sigBuf.length !== expBuf.length) return null;
    if (!crypto.timingSafeEqual(sigBuf, expBuf)) return null;
  } catch {
    return null;
  }

  const parts = payload.split(":");
  if (parts.length !== 3) return null;
  const [id, role, expiresAtStr] = parts;
  const expiresAt = Number(expiresAtStr);
  if (!Number.isFinite(expiresAt) || Date.now() > expiresAt) return null;

  return { id, role: role as UserRole };
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
    sameSite: "strict",
    maxAge: SESSION_TTL_MS / 1000,
    path: "/",
  });
}

export async function clearSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}
