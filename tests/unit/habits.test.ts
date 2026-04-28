import { toggleHabitCompletion } from "@/lib/habits";
import type { Habit } from "@/types/habit";

const base: Habit = {
  id: "1",
  userId: "u1",
  name: "Drink Water",
  description: "",
  frequency: "daily",
  createdAt: "2025-01-01T00:00:00.000Z",
  completions: [],
};

describe("toggleHabitCompletion", () => {
  it("adds a completion date when the date is not present", () => {
    const r = toggleHabitCompletion(base, "2025-04-27");
    expect(r.completions).toContain("2025-04-27");
  });
  it("removes a completion date when the date already exists", () => {
    const r = toggleHabitCompletion(
      { ...base, completions: ["2025-04-27"] },
      "2025-04-27",
    );
    expect(r.completions).not.toContain("2025-04-27");
  });
  it("does not mutate the original habit object", () => {
    const original: Habit = { ...base, completions: [] };
    toggleHabitCompletion(original, "2025-04-27");
    expect(original.completions).toEqual([]);
  });
  it("does not return duplicate completion dates", () => {
    const r = toggleHabitCompletion(
      { ...base, completions: ["2025-04-27"] },
      "2025-04-26",
    );
    const set = new Set(r.completions);
    expect(set.size).toBe(r.completions.length);
  });
});
