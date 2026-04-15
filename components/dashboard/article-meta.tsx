import { Clock } from "lucide-react";
import { MonoLabel } from "./mono-label";

function timeAgo(dateStr: string): string {
  const now = new Date();
  const published = new Date(dateStr);
  const diffMs = now.getTime() - published.getTime();
  const diffH = Math.floor(diffMs / (1000 * 60 * 60));

  if (diffH < 1) return "Just now";
  if (diffH < 24) return `${diffH}h ago`;
  const diffD = Math.floor(diffH / 24);
  if (diffD === 1) return "Yesterday";
  return `${diffD}d ago`;
}

interface ArticleMetaProps {
  source: string;
  published: string;
  showIcon?: boolean;
  sourceClassName?: string;
  timeClassName?: string;
}

export function ArticleMeta({
  source,
  published,
  showIcon = true,
  sourceClassName,
  timeClassName,
}: ArticleMetaProps) {
  return (
    <>
      <MonoLabel className={sourceClassName}>{source}</MonoLabel>
      {showIcon ? (
        <span className="flex items-center gap-1">
          <Clock className="h-2.5 w-2.5" />
          <MonoLabel className={timeClassName}>{timeAgo(published)}</MonoLabel>
        </span>
      ) : (
        <MonoLabel className={timeClassName}>{timeAgo(published)}</MonoLabel>
      )}
    </>
  );
}
