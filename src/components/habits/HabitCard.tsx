"use client";

import { useState } from "react";
import type { Habit } from "@/types/habit";
import { getHabitSlug } from "@/lib/slug";
import { calculateCurrentStreak } from "@/lib/streaks";
import { getTodayISO } from "@/lib/streaks";

type Props = {
  habit: Habit;
  onToggleToday: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function HabitCard({
  habit,
  onToggleToday,
  onEdit,
  onDelete,
}: Props) {
  const slug = getHabitSlug(habit.name);
  const today = getTodayISO();
  const streak = calculateCurrentStreak(habit.completions, today);
  const completedToday = habit.completions.includes(getTodayISO());
  const [confirming, setConfirming] = useState(false);

  return (
    <article
      data-testid={`habit-card-${slug}`}
      className={`rounded border p-4 ${completedToday ? "bg-green-50 border-green-400" : "bg-white"}`}
    >
      <header className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-semibold">{habit.name}</h3>
          {habit.description && (
            <p className="text-sm text-gray-600">{habit.description}</p>
          )}
        </div>
        <span
          data-testid={`habit-streak-${slug}`}
          className="text-sm font-medium"
        >
          🔥 {streak}
        </span>
      </header>
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          data-testid={`habit-complete-${slug}`}
          type="button"
          onClick={() => onToggleToday(habit.id)}
          className="rounded bg-blue-600 px-3 py-1 text-sm text-white"
        >
          {completedToday ? "Unmark today" : "Complete today"}
        </button>
        <button
          data-testid={`habit-edit-${slug}`}
          type="button"
          onClick={() => onEdit(habit.id)}
          className="rounded border px-3 py-1 text-sm"
        >
          Edit
        </button>
        <button
          data-testid={`habit-delete-${slug}`}
          type="button"
          onClick={() => setConfirming(true)}
          className="rounded border border-red-400 px-3 py-1 text-sm text-red-600"
        >
          Delete
        </button>
      </div>
      {confirming && (
        <div
          role="alertdialog"
          aria-modal="true"
          className="mt-3 rounded border border-red-300 bg-red-50 p-3"
        >
          <p className="text-sm">Delete this habit?</p>
          <div className="mt-2 flex gap-2">
            <button
              data-testid="confirm-delete-button"
              type="button"
              onClick={() => {
                setConfirming(false);
                onDelete(habit.id);
              }}
              className="rounded bg-red-600 px-3 py-1 text-sm text-white"
            >
              Confirm delete
            </button>
            <button
              type="button"
              onClick={() => setConfirming(false)}
              className="rounded border px-3 py-1 text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </article>
  );
}
