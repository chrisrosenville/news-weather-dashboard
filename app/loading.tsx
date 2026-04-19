import { DashboardHeader } from "@/components/dashboard/header";

function Skeleton({ className }: { className?: string }) {
  return (
    <div className={`animate-pulse rounded-lg bg-muted ${className ?? ""}`} />
  );
}

export default function Loading() {
  return (
    <main className="flex min-h-screen flex-col">
      <DashboardHeader />

      <div className="flex flex-1 flex-col gap-8 px-6 py-8 md:px-10">
        {/* Weather + leaderboard skeleton row */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_minmax(320px,400px)]">
          <div className="rounded-xl border border-border bg-card p-6 md:p-8">
            <div className="mb-5 flex items-center gap-2">
              <Skeleton className="h-1.5 w-1.5 rounded-full" />
              <Skeleton className="h-3 w-32" />
            </div>

            <div className="flex items-start gap-4">
              <Skeleton className="h-12 w-12 rounded-lg" />
              <div className="flex flex-col gap-2">
                <Skeleton className="h-14 w-36" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>

            <div className="my-5 h-px bg-border" />

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="flex flex-col gap-1.5 rounded-lg border border-border px-4 py-3"
                >
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="h-5 w-12" />
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 md:p-8">
            <div className="mb-5 flex items-center gap-2">
              <Skeleton className="h-1.5 w-1.5 rounded-full" />
              <Skeleton className="h-3 w-28" />
            </div>

            <div className="flex items-end justify-between gap-4">
              <div className="flex items-center gap-3">
                <Skeleton className="h-5 w-5 rounded-md" />
                <Skeleton className="h-7 w-36" />
              </div>
              <div className="flex flex-col items-end gap-1">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-5 w-20" />
              </div>
            </div>

            <div className="my-5 h-px bg-border" />

            <div className="space-y-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5"
                >
                  <Skeleton className="h-6 w-6 rounded-md" />
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <div className="flex min-w-0 flex-1 flex-col gap-2">
                    <div className="flex items-center justify-between gap-2">
                      <Skeleton className="h-3.5 w-28" />
                      <Skeleton className="h-3.5 w-16" />
                    </div>
                    <Skeleton className="h-1 w-full rounded-full" />
                  </div>
                </div>
              ))}
            </div>

            <div className="my-4 h-px bg-border" />

            <div className="flex items-center justify-between">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-3 w-28" />
            </div>
          </div>
        </div>

        {/* Search skeleton */}
        <div className="h-11 w-full rounded-xl border border-border bg-card" />

        {/* News section skeleton */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <Skeleton className="h-7 w-48" />
            <div className="editorial-rule flex-1" />
            <Skeleton className="h-3 w-20" />
          </div>

          {/* Featured row */}
          <div className="grid gap-4 md:grid-cols-2">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5 md:p-6"
              >
                <div className="flex items-center gap-2">
                  <Skeleton className="h-3 w-40" />
                  <Skeleton className="ml-auto h-5 w-16 rounded-md" />
                </div>

                <div className="space-y-2">
                  <Skeleton className="h-7 w-full" />
                  <Skeleton className="h-7 w-5/6" />
                </div>

                <div className="space-y-2">
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-11/12" />
                  <Skeleton className="h-3 w-2/3" />
                </div>

                <div className="mt-auto flex justify-end pt-2">
                  <Skeleton className="h-4 w-4 rounded-sm" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
