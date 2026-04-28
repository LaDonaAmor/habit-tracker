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
        group relative h-full
        rounded-2xl border bg-card shadow-soft card-hover
        flex flex-col
        p-4 sm:p-5 lg:p-6
        transition-all
        ${
          completedToday
            ? "border-accent-sage/60 bg-accent-sage/5"
            : "border-border-warm"
        }
      `}
    >
      <header className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="font-serif text-lg sm:text-xl font-semibold text-ink truncate">
            {habit.name}
          </h3>

          {habit.description && (
            <p className="mt-1 text-sm text-muted line-clamp-2">
              {habit.description}
            </p>
          )}
        </div>

        <span
          data-testid={`habit-streak-${slug}`}
          className="shrink-0 rounded-full bg-cream px-3 py-1 text-xs font-medium border border-warm"
        >
          🔥 {streak}
        </span>
      </header>

      <div className="mt-auto pt-4 flex flex-wrap gap-2">
        <button
          data-testid={`habit-complete-${slug}`}
          type="button"
          onClick={() => onToggleToday(habit.id)}
          className={`rounded-xl px-3 sm:px-4 py-2 text-sm font-medium transition
            ${
              completedToday
                ? "bg-cream text-ink border border-warm"
                : "bg-accent-sage text-white hover:opacity-90"
            }`}
        >
          {completedToday ? "Undo" : "Complete"}
        </button>

        <button
          type="button"
          onClick={() => onEdit(habit.id)}
          className="rounded-xl border border-warm bg-card px-3 sm:px-4 py-2 text-sm text-ink hover:bg-cream"
        >
          Edit
        </button>

        <button
          type="button"
          onClick={() => setConfirming(true)}
          className="rounded-xl border border-red-200 bg-red-50 px-3 sm:px-4 py-2 text-sm text-red-600 hover:bg-red-100"
        >
          Delete
        </button>
      </div>

      {confirming && (
        <div className="mt-4 rounded-xl border border-warm bg-card p-4 shadow-soft">
          <p className="text-sm text-ink">Delete this habit?</p>

          <div className="mt-3 flex gap-2">
            <button
              onClick={() => {
                setConfirming(false);
                onDelete(habit.id);
              }}
              className="rounded-xl bg-red-600 px-3 py-2 text-sm text-white"
            >
              Delete
            </button>

            <button
              onClick={() => setConfirming(false)}
              className="rounded-xl border border-warm px-3 py-2 text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </article>
  );
}
