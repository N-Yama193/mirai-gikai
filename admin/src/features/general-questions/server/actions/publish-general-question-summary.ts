"use server";

import { requireAdmin } from "@/features/auth/server/lib/auth-server";
import {
  invalidateWebCache,
  WEB_CACHE_TAGS,
} from "@/lib/utils/cache-invalidation";
import { getErrorMessage } from "@/lib/utils/get-error-message";
import { publishGeneralQuestionSummary as publishGeneralQuestionSummaryRecord } from "../repositories/general-question-repository";

export type PublishGeneralQuestionSummaryInput = {
  id: string;
};

export async function publishGeneralQuestionSummary(
  input: PublishGeneralQuestionSummaryInput
) {
  try {
    await requireAdmin();

    await publishGeneralQuestionSummaryRecord(input.id);

    await invalidateWebCache([WEB_CACHE_TAGS.GENERAL_QUESTIONS]);
    return { data: true };
  } catch (error) {
    console.error("Publish general question summary error:", error);
    return {
      error: getErrorMessage(error, "AI要約の公開中にエラーが発生しました"),
    };
  }
}
