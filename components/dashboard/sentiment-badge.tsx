import { Badge } from "@/components/ui/badge";

function getSentimentColor(sentiment: string) {
  switch (sentiment?.toLowerCase()) {
    case "positive":
      return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
    case "negative":
      return "bg-red-500/10 text-red-400 border-red-500/20";
    default:
      return "bg-zinc-500/10 text-zinc-400 border-zinc-500/20";
  }
}

interface SentimentBadgeProps {
  sentiment: string;
  className?: string;
}

export function SentimentBadge({ sentiment, className }: SentimentBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={`text-[9px] ${getSentimentColor(sentiment)} ${className ?? ""}`}
    >
      {sentiment}
    </Badge>
  );
}
