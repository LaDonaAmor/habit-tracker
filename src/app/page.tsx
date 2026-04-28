"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import SplashScreen from "@/components/shared/SplashScreen";
import { storage } from "@/lib/storage";
import { ROUTES } from "@/lib/constants";

export default function Home() {
  const router = useRouter();
  const hasRedirected = useRef(false);

  useEffect(() => {
    if (hasRedirected.current) return;
    hasRedirected.current = true;

    const session = storage.getSession();

    const timer = setTimeout(() => {
      router.replace(session ? ROUTES.DASHBOARD : ROUTES.LOGIN);
    }, 1000);

    return () => clearTimeout(timer);
  }, [router]);

  return <SplashScreen />;
}
