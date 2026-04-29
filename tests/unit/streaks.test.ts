import { describe, it, expect } from "vitest";
import { calculateCurrentStreak } from "@/lib/streaks";

const today = "2025-04-27";
const yesterday = "2025-04-26";
const twoDaysAgo = "2025-04-25";
const threeDaysAgo = "2025-04-24";

describe("calculateCurrentStreak", () => {
  it("returns 0 when completions is empty", () => {
    expect(calculateCurrentStreak([], today)).toBe(0);
  });
  it("returns 0 when today is not completed", () => {
    expect(calculateCurrentStreak([yesterday, twoDaysAgo], today)).toBe(0);
  });
  it("returns the correct streak for consecutive completed days", () => {
    expect(calculateCurrentStreak([today, yesterday, twoDaysAgo], today)).toBe(
      3,
    );
  });
  it("ignores duplicate completion dates", () => {
    expect(
      calculateCurrentStreak([today, today, yesterday, yesterday], today),
    ).toBe(2);
  });
  it("breaks the streak when a calendar day is missing", () => {
    expect(
      calculateCurrentStreak([today, twoDaysAgo, threeDaysAgo], today),
    ).toBe(1);
  });
});
