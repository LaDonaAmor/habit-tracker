"use client";

import type { Habit } from "@/types/habit";
import HabitCard from "./HabitCard";

type Props = {
  habits: Habit[];
  onToggleToday: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function HabitList({
  habits,
  onToggleToday,
  onEdit,
  onDelete,
}: Props) {
  if (habits.length === 0) {
    return (
      <div
        data-testid="empty-state"
        className="mt-10 rounded-2xl border border-warm bg-card p-10 text-center"
      >
        <h3 className="font-serif text-2xl text-ink">No habits yet</h3>
        <p className="mt-2 text-muted">
          Create your first habit and start building consistency.
        </p>
      </div>
    );
  }

  return (
    <ul data-testid="habit-list" className="mt-6 space-y-4">
      {habits.map((h) => (
        <li key={h.id}>
          <HabitCard
            habit={h}
            onToggleToday={onToggleToday}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </li>
      ))}
    </ul>
  );
}
