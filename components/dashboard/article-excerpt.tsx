import { cn } from "@/lib/utils";

interface ArticleExcerptProps {
  text: string | undefined;
  maxLength: number;
  className?: string;
}

export function ArticleExcerpt({
  text,
  maxLength,
  className,
}: ArticleExcerptProps) {
  if (!text) return null;

  const truncated = text.slice(0, maxLength);
  const needsEllipsis = text.length > maxLength;

  return (
    <p className={cn("leading-relaxed text-muted-foreground", className)}>
      {truncated}
      {needsEllipsis ? "…" : ""}
    </p>
  );
}
