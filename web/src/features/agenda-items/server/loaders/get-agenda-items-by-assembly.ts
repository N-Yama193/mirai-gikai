import { unstable_cache } from "next/cache";
import { CACHE_TAGS } from "@/lib/cache-tags";
import type { AgendaItem } from "../../shared/types";
import { findAgendaItemsByAssemblyId } from "../repositories/agenda-item-repository";

/**
 * 定例会IDに紐づく議案一覧を取得
 */
export async function getAgendaItemsByAssembly(
  assemblyId: string
): Promise<AgendaItem[]> {
  return _getCachedAgendaItemsByAssembly(assemblyId);
}

const _getCachedAgendaItemsByAssembly = unstable_cache(
  async (assemblyId: string): Promise<AgendaItem[]> => {
    return findAgendaItemsByAssemblyId(assemblyId);
  },
  ["agenda-items-by-assembly"],
  {
    revalidate: 3600, // 1時間
    tags: [CACHE_TAGS.AGENDA_ITEMS],
  }
);
