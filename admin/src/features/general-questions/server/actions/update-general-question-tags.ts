"use server";

import { requireAdmin } from "@/features/auth/server/lib/auth-server";
import {
  invalidateWebCache,
  WEB_CACHE_TAGS,
} from "@/lib/utils/cache-invalidation";
import { getErrorMessage } from "@/lib/utils/get-error-message";
import { updateGeneralQuestionTags as updateGeneralQuestionTagsRecord } from "../repositories/general-question-repository";

export type UpdateGeneralQuestionTagsInput = {
  id: string;
  policyTags: string[];
  isFeatured: boolean;
};

export async function updateGeneralQuestionTags(
  input: UpdateGeneralQuestionTagsInput
) {
  try {
    await requireAdmin();

    await updateGeneralQuestionTagsRecord(input.id, {
      policyTags: input.policyTags,
      isFeatured: input.isFeatured,
    });

    await invalidateWebCache([WEB_CACHE_TAGS.GENERAL_QUESTIONS]);
    return { data: true };
  } catch (error) {
    console.error("Update general question tags error:", error);
    return {
      error: getErrorMessage(error, "タグ設定の保存中にエラーが発生しました"),
    };
  }
}
