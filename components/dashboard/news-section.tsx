"use client";

import { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import { Article } from "@/types/article";
import { NewsGrid } from "./news-grid";
import { MonoLabel } from "./mono-label";

interface NewsSectionProps {
  articles: Article[];
}

export function NewsSection({ articles }: NewsSectionProps) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return articles;

    const lower = query.toLowerCase();
    return articles.filter(
      (a) =>
        a.title?.toLowerCase().includes(lower) ||
        a.text?.toLowerCase().includes(lower) ||
        a.thread?.site_full?.toLowerCase().includes(lower) ||
        a.categories?.some((c) => c.toLowerCase().includes(lower)),
    );
  }, [articles, query]);

  return (
    <div className="flex flex-col gap-6">
      {/* Search bar */}
      <div className="relative">
        <div className="group relative flex items-center">
          <Search className="pointer-events-none absolute left-4 z-10 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-amber" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles by title, content, source, or category…"
            className="h-11 w-full rounded-xl border border-border bg-card pl-11 pr-10 font-sans text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-amber/40 focus:outline-none focus:ring-2 focus:ring-amber/10"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 flex h-5 w-5 items-center justify-center rounded-md text-muted-foreground/50 transition-colors hover:text-foreground"
              aria-label="Clear search"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Search result indicator */}
        {query.trim() && (
          <div className="mt-2 flex items-center gap-2">
            <div className="h-1 w-1 rounded-full bg-amber/60" />
            <MonoLabel className="text-[9px] text-muted-foreground/60">
              {filtered.length} {filtered.length === 1 ? "result" : "results"}{" "}
              for &ldquo;
              {query.trim()}&rdquo;
            </MonoLabel>
          </div>
        )}
      </div>

      <NewsGrid articles={filtered} />
    </div>
  );
}
