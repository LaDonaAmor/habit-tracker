import { APP_NAME } from "@/lib/constants";

export default function SplashScreen() {
  return (
    <div
      data-testid="splash-screen"
      className="flex min-h-screen items-center justify-center bg-cream"
    >
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-warm bg-card px-10 py-8 shadow-soft">
        {/* App Name */}
        <h1 className="font-serif text-3xl font-bold text-ink tracking-tight">
          {APP_NAME}
        </h1>

        {/* Subtext */}
        <p className="text-sm text-muted">Building consistency...</p>

        {/* Loader */}
        <div className="mt-2 flex gap-1">
          <span className="h-2 w-2 animate-pulse rounded-full bg-accent-peach" />
          <span className="h-2 w-2 animate-pulse rounded-full bg-accent-sage [animation-delay:150ms]" />
          <span className="h-2 w-2 animate-pulse rounded-full bg-accent-rose [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  );
}
