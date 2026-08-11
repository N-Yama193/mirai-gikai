import { AiSummaryCard } from "@/components/ai-summary-card";
import { formatDateWithDots } from "@/lib/utils/date";
import type {
  AgendaItemDetail as AgendaItemDetailType,
  AgendaItemStatus,
  AiSummaryContent,
} from "../../shared/types";
import { AgendaItemStatusBadge } from "./agenda-item-status-badge";

interface AgendaItemDetailProps {
  item: AgendaItemDetailType;
}

export function AgendaItemDetail({ item }: AgendaItemDetailProps) {
  // AI要約(detail優先、無ければeasy)があればそちらを表示し、無ければ提案理由の原文を表示する
  const summary =
    item.summaries.find((s) => s.mode === "detail") ??
    item.summaries.find((s) => s.mode === "easy");

  const aiSummary =
    item.ai_summary_status === "published"
      ? (item.ai_summary as AiSummaryContent | null)
      : null;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground">
            {item.item_number}
          </span>
          <AgendaItemStatusBadge status={item.status as AgendaItemStatus} />
        </div>
        <h1 className="text-[22px] font-bold text-black leading-[1.48]">
          {item.title}
        </h1>
        <span className="text-xs font-medium text-muted-foreground">
          {item.category}
          {item.decided_on && ` ・ ${formatDateWithDots(item.decided_on)} 議決`}
        </span>
      </div>

      {aiSummary && (
        <AiSummaryCard
          points={aiSummary.points}
          conclusion={aiSummary.conclusion}
        />
      )}

      {(summary?.content ?? item.proposal_reason) && (
        <p className="text-sm leading-relaxed whitespace-pre-wrap">
          {summary?.content ?? item.proposal_reason}
        </p>
      )}
    </div>
  );
}
