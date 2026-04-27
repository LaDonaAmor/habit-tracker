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
      className="space-y-3 rounded border p-4"
    >
      <label htmlFor="habit-name" className="block">
        <span className="block text-sm">Habit name</span>
        <input
          id="habit-name"
          data-testid="habit-name-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 w-full rounded border px-3 py-2"
        />
      </label>
      <label className="block">
        <span className="block text-sm">Description</span>
        <input
          data-testid="habit-description-input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 w-full rounded border px-3 py-2"
        />
      </label>
      <label className="block">
        <span className="block text-sm">Frequency</span>
        <select
          data-testid="habit-frequency-select"
          value="daily"
          onChange={() => {}}
          className="mt-1 w-full rounded border px-3 py-2"
        >
          <option value="daily">Daily</option>
        </select>
      </label>
      {error && (
        <p role="alert" className="text-sm text-red-600">
          {error}
        </p>
      )}
      <div className="flex gap-2">
        <button
          data-testid="habit-save-button"
          type="submit"
          className="rounded bg-blue-600 px-4 py-2 text-white"
        >
          Save
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded border px-4 py-2"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
