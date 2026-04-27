import type { Habit } from "@/types/habit";

export function toggleHabitCompletion(habit: Habit, date: string): Habit {
  const set = new Set(habit.completions);
  if (set.has(date)) set.delete(date);
  else set.add(date);
  return { ...habit, completions: Array.from(set) };
}
