"use server";

import { requireAdmin } from "@/features/auth/server/lib/auth-server";
import {
  invalidateWebCache,
  WEB_CACHE_TAGS,
} from "@/lib/utils/cache-invalidation";
import { getErrorMessage } from "@/lib/utils/get-error-message";
import { publishAgendaItemSummary } from "../repositories/agenda-item-repository";

export type PublishAgendaSummaryInput = {
  id: string;
};

export async function publishAgendaSummary(input: PublishAgendaSummaryInput) {
  try {
    await requireAdmin();

    await publishAgendaItemSummary(input.id);

    await invalidateWebCache([WEB_CACHE_TAGS.AGENDA_ITEMS]);
    return { data: true };
  } catch (error) {
    console.error("Publish agenda summary error:", error);
    return {
      error: getErrorMessage(error, "AI要約の公開中にエラーが発生しました"),
    };
  }
}
