import { Article } from "@/types/article";
import { ArrowUpRight } from "lucide-react";
import { ArticleLink } from "./article-link";
import { ArticleMeta } from "./article-meta";
import { ArticleExcerpt } from "./article-excerpt";
import { SentimentBadge } from "./sentiment-badge";
import { MonoLabel } from "./mono-label";

function FeaturedCard({ article, index }: { article: Article; index: number }) {
  return (
    <ArticleLink
      href={article.url}
      index={index}
      className="flex flex-col rounded-xl border border-border bg-card transition-colors hover:border-amber/30"
    >
      <div className="flex flex-1 flex-col gap-4 p-5 md:p-6">
        {/* Meta row */}
        <div className="flex items-center gap-2">
          <ArticleMeta
            source={article.thread?.site_full || "Unknown source"}
            published={article.published}
            sourceClassName="text-amber/70"
            timeClassName="text-muted-foreground"
          />
          {article.sentiment && (
            <SentimentBadge sentiment={article.sentiment} className="ml-auto" />
          )}
        </div>

        {/* Title */}
        <h3 className="font-display text-xl font-semibold leading-snug tracking-tight text-foreground transition-colors group-hover:text-amber md:text-2xl">
          {article.title}
        </h3>

        {/* Excerpt */}
        <ArticleExcerpt
          text={article.text}
          maxLength={200}
          className="line-clamp-3 text-sm"
        />

        {/* Bottom row */}
        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="flex flex-wrap gap-1.5">
            {article.categories?.slice(0, 3).map((cat) => (
              <MonoLabel
                key={cat}
                className="rounded-md bg-secondary px-2 py-0.5 text-[9px] tracking-wider"
              >
                {cat}
              </MonoLabel>
            ))}
          </div>
          <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-amber" />
        </div>
      </div>
    </ArticleLink>
  );
}

function StandardCard({ article, index }: { article: Article; index: number }) {
  return (
    <ArticleLink
      href={article.url}
      index={index}
      className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-amber/30"
    >
      {/* Meta */}
      <div className="flex items-center gap-2">
        <ArticleMeta
          source={article.thread?.site_full || "Source"}
          published={article.published}
          sourceClassName="text-amber/60"
          timeClassName="text-muted-foreground/60"
        />
      </div>

      {/* Title */}
      <h3 className="font-display text-base font-semibold leading-snug tracking-tight text-foreground transition-colors group-hover:text-amber">
        {article.title}
      </h3>

      {/* Excerpt */}
      <ArticleExcerpt
        text={article.text}
        maxLength={120}
        className="line-clamp-2 text-xs"
      />

      {/* Footer */}
      <div className="mt-auto flex items-center justify-between">
        {article.sentiment && <SentimentBadge sentiment={article.sentiment} />}
        <ArrowUpRight className="ml-auto h-3.5 w-3.5 text-muted-foreground/40 transition-all group-hover:text-amber" />
      </div>
    </ArticleLink>
  );
}

function CompactCard({ article, index }: { article: Article; index: number }) {
  return (
    <ArticleLink
      href={article.url}
      index={index}
      className="flex items-start gap-3 rounded-lg border border-border px-4 py-3 transition-colors hover:border-amber/30"
    >
      <div className="flex flex-col gap-1">
        <h3 className="text-sm font-medium leading-snug text-foreground/90 transition-colors group-hover:text-amber">
          {article.title}
        </h3>
        <div className="flex items-center gap-2">
          <ArticleMeta
            source={article.thread?.site_full || "Source"}
            published={article.published}
            showIcon={false}
            sourceClassName="text-[9px] tracking-wider text-muted-foreground/50"
            timeClassName="text-[9px] text-muted-foreground/40"
          />
        </div>
      </div>
    </ArticleLink>
  );
}

interface NewsGridProps {
  articles: Article[];
}

export function NewsGrid({ articles }: NewsGridProps) {
  if (!articles || articles.length === 0) {
    return (
      <div className="flex items-center justify-center rounded-xl border border-border bg-card p-12">
        <p className="font-mono text-sm text-muted-foreground">
          No news articles available
        </p>
      </div>
    );
  }

  const featured = articles.slice(0, 2);
  const standard = articles.slice(2, 6);
  const compact = articles.slice(6, 14);

  return (
    <section className="flex flex-col gap-6">
      {/* Section header */}
      <div className="flex items-center gap-4">
        <h2 className="font-display text-2xl font-bold tracking-tight text-foreground">
          Latest from Denmark
        </h2>
        <div className="editorial-rule flex-1" />
        <MonoLabel>{articles.length} articles</MonoLabel>
      </div>

      {/* Featured row */}
      {featured.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2">
          {featured.map((article, i) => (
            <FeaturedCard key={article.uuid} article={article} index={i} />
          ))}
        </div>
      )}

      {/* Standard grid */}
      {standard.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {standard.map((article, i) => (
            <StandardCard key={article.uuid} article={article} index={i + 2} />
          ))}
        </div>
      )}

      {/* Compact list */}
      {compact.length > 0 && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3 py-2">
            <MonoLabel className="text-muted-foreground">
              More Headlines
            </MonoLabel>
            <div className="h-px flex-1 bg-border" />
          </div>
          <div className="grid gap-2 md:grid-cols-2">
            {compact.map((article, i) => (
              <CompactCard key={article.uuid} article={article} index={i} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
