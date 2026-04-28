"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const root = document.documentElement;

    if (dark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [dark]);

  function toggle() {
    const root = document.documentElement;
    const next = !dark;

    setDark(next);
    root.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  }

  return (
    <button
      onClick={toggle}
      className="
        flex items-center gap-1.5 bg-card
        transition rounded-xl border border-warm bg-cream px-3 py-1.5 text-sm hover:bg-card
      "
      aria-label="Toggle theme"
    >
      <span>{dark ? "☀️" : "🌙"}</span>
      <span className="hidden sm:inline">{dark ? "Light" : "Dark"}</span>
    </button>
  );
}
