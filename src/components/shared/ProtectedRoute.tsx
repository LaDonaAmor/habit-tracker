"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { storage } from "@/lib/storage";
import { ROUTES } from "@/lib/constants";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const session = storage.getSession();

    if (!session) {
      router.replace(ROUTES.LOGIN);
    }
  }, [router]);

  const session = storage.getSession();

  if (!session) return null;

  return <>{children}</>;
}
