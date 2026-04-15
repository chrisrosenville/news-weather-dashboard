"use client";

import { useEffect } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-1 items-center justify-center px-6 py-20">
      <div className="flex max-w-md flex-col items-center gap-4 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-card">
          <AlertTriangle className="h-5 w-5 text-muted-foreground" />
        </div>

        <div className="flex flex-col gap-1">
          <h2 className="font-display text-xl font-semibold text-foreground">
            Something went wrong
          </h2>
          <p className="text-sm text-muted-foreground">
            The dashboard failed to load. This is usually a temporary issue with
            one of the data sources.
          </p>
          {error.digest && (
            <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground/50">
              Error ID: {error.digest}
            </p>
          )}
        </div>

        <button
          onClick={() => unstable_retry()}
          className="mt-2 inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Try again
        </button>
      </div>
    </div>
  );
}
