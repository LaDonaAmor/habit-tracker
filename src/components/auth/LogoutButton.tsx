"use client";

import { useRouter } from "next/navigation";
import { logout } from "@/lib/auth";
import { ROUTES } from "@/lib/constants";

export default function LogoutButton() {
  const router = useRouter();

  return (
    <button
      data-testid="auth-logout-button"
      type="button"
      onClick={() => {
        logout();
        router.push(ROUTES.LOGIN);
      }}
      className="rounded border px-3 py-1 text-sm"
    >
      Log out
    </button>
  );
}
