import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeaturedBadgeProps {
  className?: string;
}

/** is_featuredがtrueの議案・一般質問に表示する「注目」バッジ */
export function FeaturedBadge({ className }: FeaturedBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-bold text-white shadow-sm",
        "bg-hirokawa-ginkgo",
        className
      )}
    >
      <Star className="h-3 w-3 fill-white" />
      注目
    </span>
  );
}
