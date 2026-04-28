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
      className="cursor-pointer btn-primary rounded-lg border border-warm px-3 py-2"
    >
      Log out
    </button>
  );
}
