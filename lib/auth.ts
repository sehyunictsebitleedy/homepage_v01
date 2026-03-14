import crypto from "crypto";
import { cookies } from "next/headers";

const SECRET = process.env.ADMIN_SECRET ?? "dev-secret-please-change-in-prod";
const ADMIN_USER = process.env.ADMIN_USER ?? "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "admin1234";
const SESSION_COOKIE = "admin_session";
const TOKEN_PAYLOAD = "authenticated";

function sign(value: string): string {
  return crypto.createHmac("sha256", SECRET).update(value).digest("hex");
}

export function verifyCredentials(user: string, password: string): boolean {
  return user === ADMIN_USER && password === ADMIN_PASSWORD;
}

export function createToken(): string {
  return `${TOKEN_PAYLOAD}.${sign(TOKEN_PAYLOAD)}`;
}

export function verifyToken(token: string): boolean {
  const dotIndex = token.lastIndexOf(".");
  if (dotIndex === -1) return false;
  const value = token.slice(0, dotIndex);
  const sig = token.slice(dotIndex + 1);
  if (value !== TOKEN_PAYLOAD) return false;
  const expected = sign(TOKEN_PAYLOAD);
  try {
    return crypto.timingSafeEqual(
      Buffer.from(sig, "hex"),
      Buffer.from(expected, "hex")
    );
  } catch {
    return false;
  }
}

export async function getSession(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return false;
  return verifyToken(token);
}

export async function setSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, createToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 8, // 8시간
    path: "/",
  });
}

export async function clearSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}
