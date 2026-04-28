"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/auth";
import Link from "next/link";
import { ROUTES } from "@/lib/constants";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = login(email, password);
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
      <h1 className="text-2xl font-bold">Log in</h1>
      <label htmlFor="email-input" className="block">
        <span className="block text-sm">Email</span>
        <input
          type="email"
          data-testid="auth-login-email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 w-full rounded border px-3 py-2"
        />
      </label>
      <label htmlFor="password-input" className="block">
        <span className="block text-sm">Password</span>
        <input
          type="password"
          data-testid="auth-login-password"
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
        data-testid="auth-login-submit"
        type="submit"
        className="w-full rounded bg-blue-600 py-2 text-white"
      >
        Log in
      </button>
      <p className="text-sm">
        No account? <Link href="/signup">Sign up</Link>
      </p>
    </form>
  );
}
