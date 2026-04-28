"use client";

import { useMemo, useState } from "react";

import Image from "next/image";

import type { Session } from "@/types/auth";

import type { Habit } from "@/types/habit";

import { storage } from "@/lib/storage";

import { toggleHabitCompletion } from "@/lib/habits";

import HabitList from "@/components/habits/HabitList";

import HabitForm from "@/components/habits/HabitForm";

import LogoutButton from "@/components/auth/LogoutButton";

import ProtectedRoute from "@/components/shared/ProtectedRoute";

import ThemeToggle from "@/components/shared/ThemeToggle";

const todayISO = () => new Date().toISOString().slice(0, 10);

const uid = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2) + Date.now().toString(36);

export default function DashboardPage() {
  const [session] = useState<Session | null>(() => storage.getSession());

  const [habits, setHabits] = useState<Habit[]>(() => storage.getHabits());

  const [showForm, setShowForm] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);

  const myHabits = useMemo(
    () => (session ? habits.filter((h) => h.userId === session.userId) : []),

    [habits, session],
  );

  function persist(next: Habit[]) {
    setHabits(next);

    storage.setHabits(next);
  }

  function handleCreate(data: {
    name: string;

    description: string;

    frequency: "daily";
  }) {
    if (!session) return;

    const habit: Habit = {
      id: uid(),

      userId: session.userId,

      name: data.name,

      description: data.description,

      frequency: "daily",

      createdAt: new Date().toISOString(),

      completions: [],
    };

    persist([...habits, habit]);

    setShowForm(false);
  }

  function handleEditSave(data: {
    name: string;

    description: string;

    frequency: "daily";
  }) {
    if (!editingId) return;

    persist(
      habits.map((h) =>
        h.id === editingId
          ? { ...h, name: data.name, description: data.description }
          : h,
      ),
    );

    setEditingId(null);
  }

  function handleDelete(id: string) {
    persist(habits.filter((h) => h.id !== id));
  }

  function handleToggleToday(id: string) {
    persist(
      habits.map((h) =>
        h.id === id ? toggleHabitCompletion(h, todayISO()) : h,
      ),
    );
  }

  const editing = editingId ? myHabits.find((h) => h.id === editingId) : null;

  return (
    <ProtectedRoute>
      <main
        data-testid="dashboard-page"
        className="min-h-screen bg-cream px-4 py-8"
      >
        <div className="mx-auto max-w-3xl space-y-6">
          <header className="bg-card flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
            <div className="flex items-center gap-3">
              <div className="shrink-0 rounded-xl p-2">
                <Image
                  src="/icons/icon-192.png"
                  alt="Logo"
                  width={48}
                  height={48}
                  className="h-6 w-6 sm:h-8 sm:w-8"
                  priority
                />
              </div>

              <div className="min-w-0">
                <h1 className="text-xl font-bold leading-tight sm:text-2xl">
                  Your habits
                </h1>

                <p className="text-muted text-xs sm:block sm:text-sm">
                  Track consistency, build discipline
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-border pt-3 sm:border-none sm:pt-0 sm:gap-3">
              <div className="flex items-center gap-2">
                <a
                  href="/profile"
                  className="rounded-xl border border-border bg-cream px-3 py-1.5 text-xs font-medium hover:bg-card sm:text-sm"
                >
                  Profile
                </a>

                <ThemeToggle />
              </div>

              <div className="flex items-center gap-2">
                <LogoutButton />
              </div>
            </div>
          </header>

          {!showForm && !editing && (
            <button
              data-testid="create-habit-button"
              onClick={() => setShowForm(true)}
              className="cursor-pointer btn-primary flex items-center justify-center gap-2 p-3 sm:w-auto sm:px-5"
            >
              + New habit
            </button>
          )}

          {showForm && (
            <div className="bg-card p-4">
              <HabitForm
                onSave={handleCreate}
                onCancel={() => setShowForm(false)}
              />
            </div>
          )}

          {editing && (
            <div className="bg-card p-4">
              <HabitForm
                initial={editing}
                onSave={handleEditSave}
                onCancel={() => setEditingId(null)}
              />
            </div>
          )}

          <div className="bg-card p-4">
            <HabitList
              habits={myHabits}
              onToggleToday={handleToggleToday}
              onEdit={(id) => setEditingId(id)}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}
