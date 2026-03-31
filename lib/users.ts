import crypto from "crypto";
import { readData, writeData } from "@/lib/data";
import type { AdminUser, UsersData } from "@/lib/types";

export function generateSalt(): string {
  return crypto.randomBytes(16).toString("hex");
}

export function hashPassword(password: string, salt: string): string {
  return crypto.pbkdf2Sync(password, salt, 100_000, 64, "sha256").toString("hex");
}

export function verifyPassword(password: string, salt: string, hash: string): boolean {
  const computed = hashPassword(password, salt);
  try {
    return crypto.timingSafeEqual(Buffer.from(computed, "hex"), Buffer.from(hash, "hex"));
  } catch {
    return false;
  }
}

export function readUsers(): AdminUser[] {
  try {
    return readData<UsersData>("users.json").users;
  } catch {
    return [];
  }
}

export function writeUsers(users: AdminUser[]): void {
  writeData<UsersData>("users.json", { users });
}

export function findUser(username: string): AdminUser | null {
  return readUsers().find((u) => u.username === username) ?? null;
}

export function findUserById(id: string): AdminUser | null {
  return readUsers().find((u) => u.id === id) ?? null;
}

export function addUser(user: AdminUser): void {
  const users = readUsers();
  users.push(user);
  writeUsers(users);
}

export function updateUser(id: string, patch: Partial<AdminUser>): void {
  const users = readUsers();
  const idx = users.findIndex((u) => u.id === id);
  if (idx === -1) return;
  users[idx] = { ...users[idx], ...patch };
  writeUsers(users);
}
