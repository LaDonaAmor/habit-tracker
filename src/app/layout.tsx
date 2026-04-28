import type { Metadata, Viewport } from "next";
import "./globals.css";
import PWARegister from "@/components/shared/PWARegister";

export const metadata: Metadata = {
  title: "Habit Tracker",
  description: "Track your daily habits and streaks",
  manifest: "/manifest.json",
  icons: {
    icon: "/icons/icon-192.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#2563eb",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-app text-ink">
        {" "}
        {/* GLOBAL TOP BAR (accessible everywhere) */}
        <div className="fixed right-4 top-4 z-50"></div>
        {children}
        <PWARegister />
      </body>
    </html>
  );
}
