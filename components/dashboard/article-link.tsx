import { cn } from "@/lib/utils";

interface ArticleLinkProps {
  href: string;
  index: number;
  className?: string;
  children: React.ReactNode;
}

export function ArticleLink({
  href,
  index,
  className,
  children,
}: ArticleLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn("group", className)}
    >
      {children}
    </a>
  );
}
