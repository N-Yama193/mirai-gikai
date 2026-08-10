import { unstable_cache } from "next/cache";
import { CACHE_TAGS } from "@/lib/cache-tags";
import type { Assembly } from "../../shared/types";
import { findAllAssemblies } from "../repositories/assembly-repository";

/**
 * 定例会・臨時会の一覧を取得
 */
export async function getAssemblies(): Promise<Assembly[]> {
  return _getCachedAssemblies();
}

const _getCachedAssemblies = unstable_cache(
  async (): Promise<Assembly[]> => {
    return findAllAssemblies();
  },
  ["assemblies"],
  {
    revalidate: 3600, // 1時間
    tags: [CACHE_TAGS.ASSEMBLIES],
  }
);
