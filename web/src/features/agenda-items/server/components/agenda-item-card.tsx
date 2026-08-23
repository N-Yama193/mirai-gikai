import { FeaturedBadge } from "@/components/featured-badge";
import { PolicyTagBadgeList } from "@/components/policy-tag-badge";
import { RubySafeLineClamp } from "@/components/ruby-safe-line-clamp";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type {
  AgendaItem,
  AgendaItemStatus,
  AiSummaryContent,
} from "../../shared/types";
import { AgendaItemStatusBadge } from "./agenda-item-status-badge";

interface AgendaItemCardProps {
  item: AgendaItem;
}

export function AgendaItemCard({ item }: AgendaItemCardProps) {
  const conclusion =
    item.ai_summary_status === "published"
      ? (item.ai_summary as AiSummaryContent | null)?.conclusion
      : null;

  return (
    <Card className="border border-black hover:bg-muted/50 transition-colors">
      <CardHeader>
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2">
            {item.is_featured && <FeaturedBadge />}
            <Badge variant="outline">{item.category}</Badge>
            <AgendaItemStatusBadge status={item.status as AgendaItemStatus} />
          </div>
          <PolicyTagBadgeList tags={item.policy_tags} />
          <span className="text-xs font-medium text-muted-foreground">
            {item.item_number}
          </span>
          <CardTitle className="text-xl/7 tracking-normal">
            {item.title}
          </CardTitle>
        </div>
      </CardHeader>
      {conclusion && (
        <CardContent>
          <RubySafeLineClamp
            text={conclusion}
            lineClamp={2}
            className="text-sm text-muted-foreground"
          />
        </CardContent>
      )}
    </Card>
  );
}
