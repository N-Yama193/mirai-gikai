import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface FeaturedBadgeProps {
  className?: string;
}

/** is_featuredがtrueの議案・一般質問に表示する「注目」バッジ */
export function FeaturedBadge({ className }: FeaturedBadgeProps) {
  return (
    <Badge variant="default" className={cn("gap-1", className)}>
      注目
    </Badge>
  );
}
