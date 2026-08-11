import { AgendaItemSummaryItem } from "../../client/components/agenda-item-summary-item";
import type { AgendaItemSummaryListRow } from "../../shared/types";

type AgendaItemSummaryListProps = {
  items: AgendaItemSummaryListRow[];
};

export function AgendaItemSummaryList({ items }: AgendaItemSummaryListProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">
        議案AI要約一覧 ({items.length}件)
      </h2>

      {items.length === 0 ? (
        <p className="text-gray-500">議案がありません</p>
      ) : (
        <div className="space-y-2">
          {items.map((item) => (
            <AgendaItemSummaryItem key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
