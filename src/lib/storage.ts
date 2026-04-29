import type { User, Session } from "@/types/auth";
import type { Habit } from "@/types/habit";
import { STORAGE_KEYS } from "./constants";

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
  getUsers: (): User[] => read<User[]>(STORAGE_KEYS.USERS, []),

  setUsers: (u: User[]) => write(STORAGE_KEYS.USERS, u),

  getSession: (): Session | null =>
    read<Session | null>(STORAGE_KEYS.SESSION, null),

  setSession: (s: Session | null) => write(STORAGE_KEYS.SESSION, s),

  clearSession: () => {
    if (isBrowser()) window.localStorage.removeItem(STORAGE_KEYS.SESSION);
  },

  getHabits: (): Habit[] => read<Habit[]>(STORAGE_KEYS.HABITS, []),

  setHabits: (h: Habit[]) => write(STORAGE_KEYS.HABITS, h),
};
