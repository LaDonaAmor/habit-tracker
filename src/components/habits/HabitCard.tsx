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
      className={`
      group relative flex flex-col
      rounded-2xl bg-card p-5 sm:p-6
      transition-all duration-200 card-hover
      ${completedToday ? "border border-accent-sage/40" : "border border-border-warm"}
    `}
    >
      {/* Header */}
      <header className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-serif text-lg font-semibold text-ink">
            {habit.name}
          </h3>

          {habit.description && (
            <p className="mt-1 line-clamp-2 text-sm text-muted">
              {habit.description}
            </p>
          )}
        </div>

        <span
          data-testid={`habit-streak-${slug}`}
          className="shrink-0 rounded-full border border-warm bg-cream px-2.5 py-1 text-xs"
        >
          🔥 {streak}
        </span>
      </header>

      {/* Actions (compact row) */}
      <div className="mt-4 flex items-center gap-2">
        <button
          data-testid={`habit-complete-${slug}`}
          type="button"
          onClick={() => onToggleToday(habit.id)}
          className={`
          rounded-lg px-3 py-1.5 text-xs font-medium transition
          ${
            completedToday
              ? "border border-warm bg-cream text-ink"
              : "bg-accent-sage text-white"
          }
        `}
        >
          {completedToday ? "Undo" : "Done"}
        </button>

        <button
          type="button"
          onClick={() => onEdit(habit.id)}
          className="rounded-lg border border-warm bg-transparent px-3 py-1.5 text-xs text-ink hover:bg-cream"
        >
          Edit
        </button>

        <button
          type="button"
          onClick={() => setConfirming(true)}
          className="rounded-lg border border-red-200 bg-transparent px-3 py-1.5 text-xs text-red-400 hover:bg-red-50"
        >
          Delete
        </button>
      </div>

      {/* Confirm delete */}
      {confirming && (
        <div className="mt-4 rounded-xl border border-warm bg-card p-3">
          <p className="text-sm text-ink">Delete this habit?</p>

          <div className="mt-3 flex gap-2">
            <button
              onClick={() => {
                setConfirming(false);
                onDelete(habit.id);
              }}
              className="rounded-lg bg-red-600 px-3 py-1.5 text-xs text-white"
            >
              Delete
            </button>

            <button
              onClick={() => setConfirming(false)}
              className="rounded-lg border border-warm px-3 py-1.5 text-xs"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </article>
  );
}
