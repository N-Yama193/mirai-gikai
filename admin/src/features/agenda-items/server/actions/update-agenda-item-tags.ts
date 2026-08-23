"use server";

import { requireAdmin } from "@/features/auth/server/lib/auth-server";
import {
  invalidateWebCache,
  WEB_CACHE_TAGS,
} from "@/lib/utils/cache-invalidation";
import { getErrorMessage } from "@/lib/utils/get-error-message";
import { updateAgendaItemTags as updateAgendaItemTagsRecord } from "../repositories/agenda-item-repository";

export type UpdateAgendaItemTagsInput = {
  id: string;
  policyTags: string[];
  isFeatured: boolean;
};

export async function updateAgendaItemTags(input: UpdateAgendaItemTagsInput) {
  try {
    await requireAdmin();

    await updateAgendaItemTagsRecord(input.id, {
      policyTags: input.policyTags,
      isFeatured: input.isFeatured,
    });

    await invalidateWebCache([WEB_CACHE_TAGS.AGENDA_ITEMS]);
    return { data: true };
  } catch (error) {
    console.error("Update agenda item tags error:", error);
    return {
      error: getErrorMessage(error, "タグ設定の保存中にエラーが発生しました"),
    };
  }
}
