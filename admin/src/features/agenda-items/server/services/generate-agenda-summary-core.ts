import "server-only";
import { generateObject } from "ai";
import { hashContent } from "@/lib/utils/content-hash";
import {
  findAgendaItemForSummary,
  saveAgendaItemSummary,
} from "../repositories/agenda-item-repository";
import { agendaSummarySchema } from "../../shared/schemas";
import {
  AGENDA_SUMMARY_MODEL,
  buildAgendaSummaryPrompt,
} from "../../shared/constants";

function buildSourceText(title: string, proposalReason: string | null) {
  return `${title}\n${proposalReason ?? ""}`;
}

/**
 * 議案のAI要約を生成し、draftとして保存する
 */
export async function generateAgendaSummaryCore(id: string): Promise<void> {
  const item = await findAgendaItemForSummary(id);

  if (!item) {
    throw new Error("議案が見つかりません");
  }

  const sourceText = buildSourceText(item.title, item.proposal_reason);
  const sourceHash = hashContent(sourceText);

  const result = await generateObject({
    model: AGENDA_SUMMARY_MODEL,
    schema: agendaSummarySchema,
    prompt: buildAgendaSummaryPrompt(sourceText),
    experimental_telemetry: {
      isEnabled: true,
      functionId: "agenda-summary-generate",
      metadata: { agendaItemId: id },
    },
  });

  await saveAgendaItemSummary(id, {
    aiSummary: result.object,
    sourceHash,
  });
}
