"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signup } from "@/lib/auth";
import Link from "next/link";
import { ROUTES } from "@/lib/constants";

export default function SignupForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = signup(email, password);
    if (!res.ok) {
      setError(res.error ?? "An unexpected error occurred");
      return;
    }
    setTimeout(() => {
      router.push(ROUTES.DASHBOARD);
    }, 0);
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-sm space-y-4 p-6">
      <h1 className="block">Sign up</h1>
      <label htmlFor="email-input">
        <span className="block text-sm">Email</span>
        <input
          type="email"
          data-testid="auth-signup-email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 w-full rounded border px-3 py-2"
        />
      </label>
      <label className="block">
        <span className="block text-sm">Password</span>
        <input
          type="password"
          data-testid="auth-signup-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 w-full rounded border px-3 py-2"
        />
      </label>
      {error && (
        <p role="alert" className="text-sm text-red-600">
          {error}
        </p>
      )}
      <button
        data-testid="auth-signup-submit"
        type="submit"
        className="w-full rounded bg-blue-600 py-2 text-white"
      >
        Sign up
      </button>
      <p className="text-sm">
        Have an account? <Link href="/login">Log in</Link>
      </p>
    </form>
  );
}
