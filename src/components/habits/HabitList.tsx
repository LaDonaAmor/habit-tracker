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
        className="rounded border border-dashed p-8 text-center text-gray-600"
      >
        No habits yet. Create your first one!
      </div>
    );
  }
  return (
    <ul
      className="grid gap-3 md:grid-cols-2 lg:grid-cols-3"
      data-testid="habit-list"
    >
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
