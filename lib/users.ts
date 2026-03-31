import { readData, writeData } from "@/lib/data";
import type { AdminUser, UsersData } from "@/lib/types";

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

export function findUserByWorksId(worksId: string): AdminUser | null {
  return readUsers().find((u) => u.worksId === worksId) ?? null;
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

export function removeUser(id: string): void {
  writeUsers(readUsers().filter((u) => u.id !== id));
}
