import "server-only";
import { generateObject } from "ai";
import { hashContent } from "@/lib/utils/content-hash";
import {
  findGeneralQuestionForSummary,
  saveGeneralQuestionSummary,
} from "../repositories/general-question-repository";
import { generalQuestionSummarySchema } from "../../shared/schemas";
import {
  GENERAL_QUESTION_SUMMARY_MODEL,
  buildGeneralQuestionSummaryPrompt,
} from "../../shared/constants";

function buildSourceText(title: string, topics: { raw_excerpt: string }[]) {
  return `${title}\n${topics.map((t) => t.raw_excerpt).join("\n\n")}`;
}

/**
 * 一般質問のAI要約を生成し、draftとして保存する
 */
export async function generateGeneralQuestionSummaryCore(
  id: string
): Promise<void> {
  const question = await findGeneralQuestionForSummary(id);

  if (!question) {
    throw new Error("一般質問が見つかりません");
  }

  const sourceText = buildSourceText(question.title, question.topics);
  const sourceHash = hashContent(sourceText);

  const result = await generateObject({
    model: GENERAL_QUESTION_SUMMARY_MODEL,
    schema: generalQuestionSummarySchema,
    prompt: buildGeneralQuestionSummaryPrompt(sourceText),
    experimental_telemetry: {
      isEnabled: true,
      functionId: "general-question-summary-generate",
      metadata: { generalQuestionId: id },
    },
  });

  await saveGeneralQuestionSummary(id, {
    aiSummary: result.object,
    sourceHash,
  });
}
