import { AgendaItemSummaryList } from "@/features/agenda-items/server/components/agenda-item-summary-list";
import { loadAgendaItemsForSummary } from "@/features/agenda-items/server/loaders/load-agenda-items-for-summary";

export default async function AgendaItemsPage() {
  const items = await loadAgendaItemsForSummary();

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-8">議案AI要約管理</h1>

      <section className="rounded-lg border bg-white p-6">
        <AgendaItemSummaryList items={items} />
      </section>
    </div>
  );
}
