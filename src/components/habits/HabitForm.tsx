"use client";

import { useState } from "react";
import type { Habit } from "@/types/habit";
import { validateHabitName } from "@/lib/validators";

type Props = {
  initial?: Partial<Habit>;
  onSave: (data: {
    name: string;
    description: string;
    frequency: "daily";
  }) => void;
  onCancel?: () => void;
};

export default function HabitForm({ initial, onSave, onCancel }: Props) {
  const [name, setName] = useState(initial?.name ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [error, setError] = useState<string | null>(null);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    const v = validateHabitName(name);
    if (!v.valid) {
      setError(v.error);
      return;
    }

    onSave({
      name: v.value,
      description: description.trim(),
      frequency: "daily",
    });
  }

  return (
    <form
      data-testid="habit-form"
      onSubmit={onSubmit}
      className="space-y-5 rounded-2xl border border-warm bg-card p-6 shadow-soft"
    >
      <div>
        <h2 className="font-serif text-xl text-ink">
          {initial ? "Edit Habit" : "Create Habit"}
        </h2>
        <p className="text-sm text-muted mt-1">
          Build consistency one habit at a time.
        </p>
      </div>

      <label htmlFor="habit-name" className="block">
        <span className="block text-sm text-ink font-medium">Habit name</span>
        <input
          id="habit-name"
          data-testid="habit-name-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Drink water"
          className="mt-2 w-full rounded-xl border border-warm bg-cream px-4 py-2 text-ink
                     focus:border-accent-peach focus:ring-2 focus:ring-accent-peach/20 outline-none"
        />
      </label>

      <label className="block">
        <span className="block text-sm text-ink font-medium">Description</span>
        <input
          data-testid="habit-description-input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Optional details..."
          className="mt-2 w-full rounded-xl border border-warm bg-cream px-4 py-2 text-ink
                     focus:border-accent-peach focus:ring-2 focus:ring-accent-peach/20 outline-none"
        />
      </label>

      <label className="block">
        <span className="block text-sm text-ink font-medium">Frequency</span>
        <select
          data-testid="habit-frequency-select"
          value="daily"
          onChange={() => {}}
          className="mt-2 w-full rounded-xl border border-warm bg-cream px-4 py-2 text-ink
                     focus:border-accent-peach focus:ring-2 focus:ring-accent-peach/20 outline-none"
        >
          <option value="daily">Daily</option>
        </select>
      </label>

      {error && (
        <p
          role="alert"
          className="text-sm text-red-600 bg-red-50 p-2 rounded-xl border border-red-200"
        >
          {error}
        </p>
      )}

      <div className="flex gap-2 pt-2">
        <button
          data-testid="habit-save-button"
          type="submit"
          className="cursor-pointer flex-1 rounded-xl bg-accent-peach px-4 py-2 text-white font-medium
                     hover:opacity-90 transition"
        >
          Save Habit
        </button>

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="cursor-pointer rounded-xl border border-warm bg-card px-4 py-2 text-ink
                       hover:bg-cream transition"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
