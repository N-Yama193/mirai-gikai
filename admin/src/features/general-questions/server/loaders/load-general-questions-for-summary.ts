import { hashContent } from "@/lib/utils/content-hash";
import type { GeneralQuestionSummaryListRow } from "../../shared/types";
import { findAllGeneralQuestionsForSummary } from "../repositories/general-question-repository";

export async function loadGeneralQuestionsForSummary(): Promise<
  GeneralQuestionSummaryListRow[]
> {
  const questions = await findAllGeneralQuestionsForSummary();

  return questions.map((question) => {
    const currentHash = hashContent(
      `${question.title}\n${question.topics.map((t) => t.raw_excerpt).join("\n\n")}`
    );
    const isOutdated =
      question.ai_summary_status === "published" &&
      question.ai_summary_source_hash !== null &&
      question.ai_summary_source_hash !== currentHash;

    return { ...question, isOutdated };
  });
}
