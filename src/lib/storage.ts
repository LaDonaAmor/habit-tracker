import type { User, Session } from "@/types/auth";
import type { Habit } from "@/types/habit";

export const STORAGE_KEYS = {
  users: "habit-tracker-users",
  session: "habit-tracker-session",
  habits: "habit-tracker-habits",
} as const;

const isBrowser = () => typeof window !== "undefined";

function read<T>(key: string, fallback: T): T {
  if (!isBrowser()) return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T): void {
  if (!isBrowser()) return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export const storage = {
  getUsers: (): User[] => read<User[]>(STORAGE_KEYS.users, []),
  setUsers: (u: User[]) => write(STORAGE_KEYS.users, u),
  getSession: (): Session | null =>
    read<Session | null>(STORAGE_KEYS.session, null),
  setSession: (s: Session | null) => write(STORAGE_KEYS.session, s),
  clearSession: () => {
    if (isBrowser()) window.localStorage.removeItem(STORAGE_KEYS.session);
  },
  getHabits: (): Habit[] => read<Habit[]>(STORAGE_KEYS.habits, []),
  setHabits: (h: Habit[]) => write(STORAGE_KEYS.habits, h),
};
