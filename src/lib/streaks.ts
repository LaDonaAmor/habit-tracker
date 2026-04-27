function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

function addDays(iso: string, delta: number): string {
  const d = new Date(iso + "T00:00:00Z");
  d.setUTCDate(d.getUTCDate() + delta);
  return d.toISOString().slice(0, 10);
}

export function calculateCurrentStreak(
  completions: string[],
  today?: string,
): number {
  const ref = today ?? todayISO();
  const set = new Set(completions);
  if (!set.has(ref)) return 0;

  let streak = 0;
  let cursor = ref;
  while (set.has(cursor)) {
    streak += 1;
    cursor = addDays(cursor, -1);
  }
  return streak;
}
