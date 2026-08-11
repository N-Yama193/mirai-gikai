import Link from "next/link";
import type { Route } from "next";
import { routes } from "@/lib/routes";
import type { AgendaItem } from "../../shared/types";
import { AgendaItemCard } from "./agenda-item-card";

interface AgendaItemListProps {
  assemblyId: string;
  items: AgendaItem[];
}

export function AgendaItemList({ assemblyId, items }: AgendaItemListProps) {
  if (items.length === 0) {
    return (
      <p className="text-center py-12 text-muted-foreground">
        この定例会の議案はまだ登録されていません
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {items.map((item) => (
        <Link
          key={item.id}
          href={routes.agendaItemDetail(assemblyId, item.id) as Route}
        >
          <AgendaItemCard item={item} />
        </Link>
      ))}
    </div>
  );
}
