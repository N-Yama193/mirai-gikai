import { AI_MODELS } from "@/lib/ai/models";

/** 一般質問AI要約生成で使用するモデル */
export const GENERAL_QUESTION_SUMMARY_MODEL = AI_MODELS.claude_sonnet_5;

export function buildGeneralQuestionSummaryPrompt(
  questionBody: string
): string {
  return `あなたは町議会の議事録要約アシスタントです。
以下の一般質問の質疑応答本文を要約してください。

【本文】
${questionBody}

以下のJSON形式で出力してください。本文に記載のない内容は推測せず、不明な場合は空文字にしてください。

{
  "points": ["論点1", "論点2", ...],
  "conclusion": "結論・町の対応方針を100字程度で"
}`;
}
