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
        {/* Weather skeleton */}
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
            {Array.from({ length: 5 }).map((_, i) => (
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
