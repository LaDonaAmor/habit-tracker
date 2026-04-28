"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import SplashScreen from "@/components/shared/SplashScreen";
import { storage } from "@/lib/storage";
import { ROUTES } from "@/lib/constants";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const t = setTimeout(() => {
      const session = storage.getSession();
      router.replace(session ? ROUTES.DASHBOARD : ROUTES.LOGIN);
    }, 1000);
    return () => clearTimeout(t);
  }, [router]);
  return <SplashScreen />;
}
