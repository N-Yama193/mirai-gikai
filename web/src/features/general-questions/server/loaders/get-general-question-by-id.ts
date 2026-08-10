import { unstable_cache } from "next/cache";
import { CACHE_TAGS } from "@/lib/cache-tags";
import type { GeneralQuestionDetail } from "../../shared/types";
import { findGeneralQuestionById } from "../repositories/general-question-repository";

/**
 * IDで一般質問を、議員情報・論点・論点要約付きで取得
 */
export async function getGeneralQuestionById(
  id: string
): Promise<GeneralQuestionDetail | null> {
  return _getCachedGeneralQuestionById(id);
}

const _getCachedGeneralQuestionById = unstable_cache(
  async (id: string): Promise<GeneralQuestionDetail | null> => {
    const data = await findGeneralQuestionById(id);

    if (!data) {
      return null;
    }

    const { council_members, question_topics, ...question } = data;

    return {
      ...question,
      council_member: council_members,
      topics: question_topics.map((topic) => {
        const { question_topic_summaries, ...rest } = topic;
        return {
          ...rest,
          summaries: question_topic_summaries,
        };
      }),
    };
  },
  ["general-question-by-id"],
  {
    revalidate: 3600, // 1時間
    tags: [CACHE_TAGS.GENERAL_QUESTIONS],
  }
);
