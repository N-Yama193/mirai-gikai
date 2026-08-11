import { unstable_cache } from "next/cache";
import { CACHE_TAGS } from "@/lib/cache-tags";
import type { AgendaItemDetail } from "../../shared/types";
import { findAgendaItemById } from "../repositories/agenda-item-repository";

/**
 * IDで議案を、AI要約付きで取得
 */
export async function getAgendaItemById(
  id: string
): Promise<AgendaItemDetail | null> {
  return _getCachedAgendaItemById(id);
}

const _getCachedAgendaItemById = unstable_cache(
  async (id: string): Promise<AgendaItemDetail | null> => {
    const data = await findAgendaItemById(id);

    if (!data) {
      return null;
    }

    const { agenda_summaries, ...item } = data;

    return {
      ...item,
      summaries: agenda_summaries,
    };
  },
  ["agenda-item-by-id"],
  {
    revalidate: 3600, // 1時間
    tags: [CACHE_TAGS.AGENDA_ITEMS],
  }
);
