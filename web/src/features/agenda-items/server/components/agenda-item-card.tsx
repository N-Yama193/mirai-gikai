import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import type { AgendaItem, AgendaItemStatus } from "../../shared/types";
import { AgendaItemStatusBadge } from "./agenda-item-status-badge";

interface AgendaItemCardProps {
  item: AgendaItem;
}

export function AgendaItemCard({ item }: AgendaItemCardProps) {
  return (
    <Card className="border border-black hover:bg-muted/50 transition-colors">
      <CardHeader>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Badge variant="outline">{item.category}</Badge>
            <AgendaItemStatusBadge status={item.status as AgendaItemStatus} />
          </div>
          <span className="text-xs font-medium text-muted-foreground">
            {item.item_number}
          </span>
          <CardTitle className="text-xl/7 tracking-normal">
            {item.title}
          </CardTitle>
        </div>
      </CardHeader>
    </Card>
  );
}
