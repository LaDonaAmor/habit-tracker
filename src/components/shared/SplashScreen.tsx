import { APP_NAME } from "@/lib/constants";

export default function SplashScreen() {
  return (
    <div
      data-testid="splash-screen"
      className="flex min-h-screen items-center justify-center bg-white"
    >
      <h1 className="text-3xl font-bold">{APP_NAME}</h1>
    </div>
  );
}
