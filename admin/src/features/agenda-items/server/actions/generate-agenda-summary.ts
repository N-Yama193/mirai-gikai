"use server";

import { requireAdmin } from "@/features/auth/server/lib/auth-server";
import {
  invalidateWebCache,
  WEB_CACHE_TAGS,
} from "@/lib/utils/cache-invalidation";
import { getErrorMessage } from "@/lib/utils/get-error-message";
import { generateAgendaSummaryCore } from "../services/generate-agenda-summary-core";

export type GenerateAgendaSummaryInput = {
  id: string;
};

export async function generateAgendaSummary(input: GenerateAgendaSummaryInput) {
  try {
    await requireAdmin();

    await generateAgendaSummaryCore(input.id);

    await invalidateWebCache([WEB_CACHE_TAGS.AGENDA_ITEMS]);
    return { data: true };
  } catch (error) {
    console.error("Generate agenda summary error:", error);
    return {
      error: getErrorMessage(error, "AI要約の生成中にエラーが発生しました"),
    };
  }
}
