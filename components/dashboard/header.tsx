import { MapPin } from "lucide-react";
import { MonoLabel } from "./mono-label";
import { ThemeToggle } from "./theme-toggle";

export function DashboardHeader() {
  const now = new Date();
  const dateStr = now.toLocaleDateString("en-DK", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="relative z-10 flex items-end justify-between border-b border-border px-6 py-5 md:px-10">
      <div className="flex flex-col gap-1">
        <h1 className="font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          Dashboard
        </h1>
        <MonoLabel className="text-[11px] tracking-[0.2em]">
          Weather & News
        </MonoLabel>
      </div>
      <div className="flex items-end gap-3">
        <div className="flex flex-col items-end gap-1">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 text-amber" />
            <MonoLabel className="text-xs tracking-wide">Aarhus, DK</MonoLabel>
          </div>
          <time className="font-mono text-[11px] tracking-wide text-muted-foreground/60">
            {dateStr}
          </time>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}
