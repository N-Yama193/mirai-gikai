import { AgendaItemSummaryItem } from "../../client/components/agenda-item-summary-item";
import type { AgendaItemSummaryListRow } from "../../shared/types";

type AgendaItemSummaryListProps = {
  items: AgendaItemSummaryListRow[];
};

/**
 * 議案一覧を所属する議会(定例会・臨時会)ごとにグループ化する。
 * 入力はリポジトリ側で議会の開催日降順・議案の表示順にソート済みのため、
 * ここでは登場順を保ったままグループ化するだけでよい。
 */
function groupByAssembly(items: AgendaItemSummaryListRow[]) {
  const groups: {
    assembly: AgendaItemSummaryListRow["assembly"];
    items: AgendaItemSummaryListRow[];
  }[] = [];

  for (const item of items) {
    const lastGroup = groups[groups.length - 1];
    if (lastGroup && lastGroup.assembly.id === item.assembly.id) {
      lastGroup.items.push(item);
    } else {
      groups.push({ assembly: item.assembly, items: [item] });
    }
  }

  return groups;
}

export function AgendaItemSummaryList({ items }: AgendaItemSummaryListProps) {
  const groups = groupByAssembly(items);

  return (
    <div className="space-y-8">
      <h2 className="text-lg font-semibold">
        議案AI要約一覧 ({items.length}件)
      </h2>

      {items.length === 0 ? (
        <p className="text-gray-500">議案がありません</p>
      ) : (
        groups.map(({ assembly, items: groupItems }) => (
          <div key={assembly.id} className="space-y-2">
            <h3 className="text-base font-semibold text-gray-700 border-b pb-1">
              {assembly.name} ({groupItems.length}件)
            </h3>
            <div className="space-y-2">
              {groupItems.map((item) => (
                <AgendaItemSummaryItem key={item.id} item={item} />
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
