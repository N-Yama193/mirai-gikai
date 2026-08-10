import { unstable_cache } from "next/cache";
import { CACHE_TAGS } from "@/lib/cache-tags";
import type { GeneralQuestionWithMember } from "../../shared/types";
import { findGeneralQuestionsByAssemblyId } from "../repositories/general-question-repository";

/**
 * 定例会IDに紐づく一般質問一覧を取得
 */
export async function getGeneralQuestionsByAssembly(
  assemblyId: string
): Promise<GeneralQuestionWithMember[]> {
  return _getCachedGeneralQuestionsByAssembly(assemblyId);
}

const _getCachedGeneralQuestionsByAssembly = unstable_cache(
  async (assemblyId: string): Promise<GeneralQuestionWithMember[]> => {
    const data = await findGeneralQuestionsByAssemblyId(assemblyId);

    return data.map((item) => {
      const { council_members, ...question } = item;
      return {
        ...question,
        council_member: council_members,
      };
    });
  },
  ["general-questions-by-assembly"],
  {
    revalidate: 3600, // 1時間
    tags: [CACHE_TAGS.GENERAL_QUESTIONS],
  }
);
