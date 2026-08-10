import { unstable_cache } from "next/cache";
import { CACHE_TAGS } from "@/lib/cache-tags";
import type { Assembly } from "../../shared/types";
import { findAssemblyById } from "../repositories/assembly-repository";

/**
 * IDで定例会・臨時会を取得
 */
export async function getAssemblyById(id: string): Promise<Assembly | null> {
  return _getCachedAssemblyById(id);
}

const _getCachedAssemblyById = unstable_cache(
  async (id: string): Promise<Assembly | null> => {
    return findAssemblyById(id);
  },
  ["assembly-by-id"],
  {
    revalidate: 3600, // 1時間
    tags: [CACHE_TAGS.ASSEMBLIES],
  }
);
