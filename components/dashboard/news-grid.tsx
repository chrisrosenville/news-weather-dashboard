import { Article } from "@/types/article";
import { ArrowUpRight } from "lucide-react";
import { ArticleLink } from "./article-link";
import { ArticleMeta } from "./article-meta";
import { ArticleExcerpt } from "./article-excerpt";
import { SentimentBadge } from "./sentiment-badge";
import { MonoLabel } from "./mono-label";

function FeaturedCard({ article }: { article: Article }) {
  return (
    <ArticleLink
      href={article.url}
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
        <div className="mt-auto flex items-center justify-end pt-2">
          <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-amber" />
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

  const topFive = articles.slice(0, 5);

  return (
    <section className="flex flex-col gap-6">
      {/* Section header */}
      <div className="flex items-center gap-4">
        <h2 className="font-display text-2xl font-bold tracking-tight text-foreground">
          Latest from Denmark
        </h2>
        <div className="editorial-rule flex-1" />
        <MonoLabel>{topFive.length} articles</MonoLabel>
      </div>

      {/* Featured article */}
      {topFive.length > 0 && (
        <div className="grid md:grid-cols-2 gap-4">
          {topFive.map((article) => (
            <FeaturedCard key={article.uuid} article={article} />
          ))}
        </div>
      )}
    </section>
  );
}
