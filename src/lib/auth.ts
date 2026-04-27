import type { User, Session } from "@/types/auth";
import { storage } from "./storage";

const uid = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2) + Date.now().toString(36);

export function signup(
  email: string,
  password: string,
): { ok: boolean; session?: Session; error?: string } {
  const users = storage.getUsers();

  if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
    return { ok: false, error: "User already exists" };
  }

  const newUser: User = {
    id: uid(),
    email,
    password,
    createdAt: new Date().toISOString(),
  };

  storage.setUsers([...users, newUser]);

  const session: Session = {
    userId: newUser.id,
    email: newUser.email,
  };
  storage.setSession(session);

  return { ok: true, session };
}

export function login(
  email: string,
  password: string,
): { ok: boolean; session?: Session; error?: string } {
  const users = storage.getUsers();

  const user = users.find(
    (u) =>
      u.email.toLowerCase() === email.toLowerCase() && u.password === password,
  );

  if (!user) {
    return { ok: false, error: "Invalid email or password" };
  }

  const session: Session = {
    userId: user.id,
    email: user.email,
  };
  storage.setSession(session);

  return { ok: true, session };
}

export function logout(): void {
  storage.clearSession();
}
