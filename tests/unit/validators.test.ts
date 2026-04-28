import { validateHabitName } from "@/lib/validators";

describe("validateHabitName", () => {
  it("returns an error when habit name is empty", () => {
    expect(validateHabitName("   ")).toEqual({
      valid: false,
      value: "",
      error: "Habit name is required",
    });
  });
  it("returns an error when habit name exceeds 60 characters", () => {
    const long = "a".repeat(61);
    const r = validateHabitName(long);
    expect(r.valid).toBe(false);
    expect(r.error).toBe("Habit name must be 60 characters or fewer");
  });
  it("returns a trimmed value when habit name is valid", () => {
    expect(validateHabitName("  Meditate  ")).toEqual({
      valid: true,
      value: "Meditate",
      error: null,
    });
  });
});
