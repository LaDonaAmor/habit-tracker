"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import type { Session } from "@/types/auth";
import type { Habit } from "@/types/habit";

import { storage } from "@/lib/storage";
import { toggleHabitCompletion } from "@/lib/habits";
import { ROUTES } from "@/lib/constants";

import HabitList from "@/components/habits/HabitList";
import HabitForm from "@/components/habits/HabitForm";
import LogoutButton from "@/components/auth/LogoutButton";

const todayISO = () => new Date().toISOString().slice(0, 10);
const uid = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2) + Date.now().toString(36);

export default function DashboardPage() {
  const router = useRouter();
  const [session] = useState<Session | null>(() => storage.getSession());
  const [habits, setHabits] = useState<Habit[]>(() => storage.getHabits());
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    if (!session) {
      router.replace(ROUTES.LOGIN);
    }
  }, [session, router]);

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
          ? { ...h, name: data.name, description: data.description } // preserves id, userId, createdAt, completions
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

  if (!session) return null;

  const editing = editingId ? myHabits.find((h) => h.id === editingId) : null;

  return (
    <main
      data-testid="dashboard-page"
      className="mx-auto max-w-2xl space-y-4 p-4"
    >
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Your habits</h1>
        <LogoutButton />
      </header>

      {!showForm && !editing && (
        <button
          data-testid="create-habit-button"
          type="button"
          onClick={() => setShowForm(true)}
          className="rounded bg-blue-600 px-4 py-2 text-white"
        >
          + New habit
        </button>
      )}

      {showForm && (
        <HabitForm onSave={handleCreate} onCancel={() => setShowForm(false)} />
      )}

      {editing && (
        <HabitForm
          initial={editing}
          onSave={handleEditSave}
          onCancel={() => setEditingId(null)}
        />
      )}

      <HabitList
        habits={myHabits}
        onToggleToday={handleToggleToday}
        onEdit={(id) => setEditingId(id)}
        onDelete={handleDelete}
      />
    </main>
  );
}
