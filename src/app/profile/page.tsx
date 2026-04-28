"use client";

import { useState, useMemo } from "react";
import ProtectedRoute from "@/components/shared/ProtectedRoute";
import { storage } from "@/lib/storage";
import ThemeToggle from "@/components/shared/ThemeToggle";

export default function ProfilePage() {
  const [session] = useState(() => storage.getSession());
  const [habits] = useState(() => storage.getHabits());

  const myHabits = useMemo(
    () => habits.filter((h) => h.userId === session?.userId),
    [habits, session],
  );

  const totalHabits = myHabits.length;
  const completedToday = myHabits.filter((h) =>
    h.completions?.includes(new Date().toISOString().slice(0, 10)),
  ).length;

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-cream px-4 py-10">
        <div className="mx-auto max-w-xl space-y-6">
          <div className="rounded-2xl bg-card p-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">Your Profile</h1>
              <div className="flex items-center gap-2">
                <a
                  href="/dashboard"
                  className="cursor-pointer rounded-xl border border-warm bg-cream px-3 py-1.5 text-sm hover:bg-card"
                >
                  Back
                </a>

                <ThemeToggle />
              </div>
            </div>

            <div className="mt-4 space-y-2 text-sm text-muted">
              <p>
                <span className="text-ink">Email:</span> {session?.email}
              </p>
              <p>
                <span className="text-ink">User ID:</span> {session?.userId}
              </p>
            </div>
          </div>

          <div className="rounded-2xl bg-card p-6">
            <h2 className="text-lg font-semibold">Stats</h2>

            <div className="mt-4 grid grid-cols-2 gap-4 text-center">
              <div className="rounded-xl border border-warm p-4">
                <p className="text-xl font-bold text-ink">{totalHabits}</p>
                <p className="text-sm text-muted">Total Habits</p>
              </div>

              <div className="rounded-xl border border-warm p-4">
                <p className="text-xl font-bold text-accent-sage">
                  {completedToday}
                </p>
                <p className="text-sm text-muted">Completed Today</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}
