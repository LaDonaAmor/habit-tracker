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
        className="mx-auto flex max-w-md flex-col items-center justify-center rounded-2xl border border-warm bg-card p-12 text-center shadow-soft mt-10"
      >
        <h3 className="font-serif text-2xl text-ink">No habits yet</h3>
        <p className="mt-3 text-muted">
          Start small. Create your first habit and build consistency step by
          step.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full p-2">
      <ul
        data-testid="habit-list"
        className="
         mx-auto flex max-w-md flex-col gap-6 items-center justify-center rounded-2xl border border-warm bg-card p-12 text-center shadow-soft mt-10 
        "
      >
        {habits.map((h) => (
          <li key={h.id} className="h-full">
            <HabitCard
              habit={h}
              onToggleToday={onToggleToday}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
