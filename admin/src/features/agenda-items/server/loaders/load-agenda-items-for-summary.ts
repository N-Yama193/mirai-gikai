import { hashContent } from "@/lib/utils/content-hash";
import type { AgendaItemSummaryListRow } from "../../shared/types";
import { findAllAgendaItemsForSummary } from "../repositories/agenda-item-repository";

export async function loadAgendaItemsForSummary(): Promise<
  AgendaItemSummaryListRow[]
> {
  const items = await findAllAgendaItemsForSummary();

  return items.map((item) => {
    const currentHash = hashContent(
      `${item.title}\n${item.proposal_reason ?? ""}`
    );
    const isOutdated =
      item.ai_summary_status === "published" &&
      item.ai_summary_source_hash !== null &&
      item.ai_summary_source_hash !== currentHash;

    return { ...item, isOutdated };
  });
}
