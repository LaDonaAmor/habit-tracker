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
    <div className="flex min-h-screen items-center justify-center bg-cream px-4">
      <form
        onSubmit={onSubmit}
        className="bg-card w-full max-w-md space-y-5 p-6 card-hover"
      >
        <div>
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="text-muted text-sm">
            Login to continue tracking habits
          </p>
        </div>

        <label className="block">
          <span className="text-sm text-muted">Email</span>
          <input
            type="email"
            data-testid="auth-login-email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full"
          />
        </label>

        <label className="block">
          <span className="text-sm text-muted">Password</span>
          <input
            type="password"
            data-testid="auth-login-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full"
          />
        </label>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <button
          data-testid="auth-login-submit"
          type="submit"
          className="cursor-pointer btn-primary w-full"
        >
          Log in
        </button>

        <p className="text-sm text-muted">
          No account?{" "}
          <Link className="text-sky-400 hover:underline" href="/signup">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}
