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
          className="shrink-0 rounded-full border border-warm bg-cream px-2.5 py-1 text-sm"
        >
          🔥 {streak}
        </span>
      </header>

      <div className="mt-4 flex items-center gap-2">
        <button
          data-testid={`habit-complete-${slug}`}
          type="button"
          onClick={() => onToggleToday(habit.id)}
          className={`cursor-pointer rounded-xl px-3 py-2 text-sm font-medium transition
      ${
        completedToday
          ? "border border-border text-emerald-500 hover:bg-emerald-50  hover:border-emerald-400"
          : "bg-primary text-white hover:opacity-90"
      }
    `}
        >
          {completedToday ? "✓ Done" : "Mark done"}
        </button>

        <button
          type="button"
          onClick={() => onEdit(habit.id)}
          className="cursor-pointer
      rounded-xl border border-border
      bg-transparent px-3 py-2 text-sm font-medium text-ink
      hover:bg-cream hover:border-primary
      hover:text-primary transition
    "
        >
          Edit
        </button>

        <button
          type="button"
          onClick={() => setConfirming(true)}
          className="cursor-pointer
      rounded-xl border border-red-200
      bg-transparent px-3 py-2 text-sm font-medium text-red-500
      hover:bg-red-50 hover:border-red-400
      transition
    "
        >
          Delete
        </button>
      </div>

      {confirming && (
        <div className="mt-4 rounded-xl border border-warm bg-card p-3">
          <p className="text-sm text-ink">Delete this habit?</p>

          <div className="mt-3 flex gap-2">
            <button
              onClick={() => {
                setConfirming(false);
                onDelete(habit.id);
              }}
              className="cursor-pointer rounded-lg bg-red-600 px-3 py-1.5 text-sm text-white"
            >
              Delete
            </button>

            <button
              onClick={() => setConfirming(false)}
              className="cursor-pointer rounded-lg border border-warm px-3 py-1.5 text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </article>
  );
}
