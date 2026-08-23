import { POLICY_TAG_LABEL_MAP } from "@mirai-gikai/shared/policy-tags";
import type { Route } from "next";
import Link from "next/link";
import { groupByPolicyTag, pickFeatured } from "@/lib/policy-tag-grouping";
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

  const featured = pickFeatured(items);
  const groups = groupByPolicyTag(items);

  return (
    <div className="flex flex-col gap-8">
      {featured.length > 0 && (
        <AgendaItemSection
          heading="注目の議案"
          items={featured}
          assemblyId={assemblyId}
        />
      )}

      {groups.map((group) => (
        <AgendaItemSection
          key={group.tag}
          heading={POLICY_TAG_LABEL_MAP[group.tag]}
          items={group.items}
          assemblyId={assemblyId}
        />
      ))}
    </div>
  );
}

interface AgendaItemSectionProps {
  heading: string;
  items: AgendaItem[];
  assemblyId: string;
}

function AgendaItemSection({
  heading,
  items,
  assemblyId,
}: AgendaItemSectionProps) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-lg font-bold text-primary">{heading}</h2>
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
    </section>
  );
}
