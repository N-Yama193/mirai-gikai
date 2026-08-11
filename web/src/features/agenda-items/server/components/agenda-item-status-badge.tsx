import { Badge } from "@/components/ui/badge";
import type { AgendaItemStatus } from "../../shared/types";

interface AgendaItemStatusBadgeProps {
  status: AgendaItemStatus;
  className?: string;
}

const STATUS_VARIANT: Record<
  AgendaItemStatus,
  "default" | "muted" | "outline"
> = {
  可決: "default",
  否決: "muted",
  継続審査: "outline",
  撤回: "muted",
  未審議: "outline",
};

export function AgendaItemStatusBadge({
  status,
  className,
}: AgendaItemStatusBadgeProps) {
  return (
    <Badge variant={STATUS_VARIANT[status]} className={className}>
      {status}
    </Badge>
  );
}
