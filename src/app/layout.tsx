import type { Metadata, Viewport } from "next";
import "./globals.css";
import PWARegister from "@/components/shared/PWARegister";

export const metadata: Metadata = {
  title: "Habit Tracker",
  description: "Track your daily habits and streaks",
  manifest: "/manifest.json",
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
      <body className="min-h-screen bg-gray-50 text-gray-900">
        {children}
        <PWARegister />
      </body>
    </html>
  );
}
