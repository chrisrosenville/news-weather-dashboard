import { cn } from "@/lib/utils";

interface ArticleLinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
}

export function ArticleLink({ href, className, children }: ArticleLinkProps) {
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
