"use server";

import { requireAdmin } from "@/features/auth/server/lib/auth-server";
import {
  invalidateWebCache,
  WEB_CACHE_TAGS,
} from "@/lib/utils/cache-invalidation";
import { getErrorMessage } from "@/lib/utils/get-error-message";
import { generateGeneralQuestionSummaryCore } from "../services/generate-general-question-summary-core";

export type GenerateGeneralQuestionSummaryInput = {
  id: string;
};

export async function generateGeneralQuestionSummary(
  input: GenerateGeneralQuestionSummaryInput
) {
  try {
    await requireAdmin();

    await generateGeneralQuestionSummaryCore(input.id);

    await invalidateWebCache([WEB_CACHE_TAGS.GENERAL_QUESTIONS]);
    return { data: true };
  } catch (error) {
    console.error("Generate general question summary error:", error);
    return {
      error: getErrorMessage(error, "AI要約の生成中にエラーが発生しました"),
    };
  }
}
