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
        <h2 className="font-serif text-xl text-ink font-black">
          {initial ? "Edit Habit" : "Create Habit"}
        </h2>
        <p className="mt-1 text-sm text-muted">
          Build consistency one habit at a time.
        </p>
      </div>

      <label className="block">
        <span className="text-sm font-bold text-ink">Habit name</span>
        <input
          id="habit-name"
          data-testid="habit-name-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Drink water"
          className="mt-2 w-full"
        />
      </label>

      <label className="block">
        <span className="text-sm font-bold text-ink">Description</span>
        <input
          data-testid="habit-description-input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Optional details..."
          className="mt-2 w-full"
        />
      </label>

      <label className="block">
        <span className="text-sm font-bold text-ink">Frequency</span>
        <select
          data-testid="habit-frequency-select"
          value="daily"
          onChange={() => {}}
          className="cursor-pointer mt-2 w-full"
        >
          <option value="daily">Daily</option>
        </select>
      </label>

      {error && (
        <p
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 p-2 text-sm text-red-600"
        >
          {error}
        </p>
      )}

      <div className="flex gap-2 pt-2">
        <button
          data-testid="habit-save-button"
          type="submit"
          className="cursor-pointer btn-primary flex-1"
        >
          Save Habit
        </button>

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="cursor-pointer rounded-xl border border-warm bg-card px-4 py-2 text-ink hover:bg-cream"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
