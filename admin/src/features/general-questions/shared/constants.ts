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

要約の方針:
- 全項目を漫然と均等に並べるのではなく、「一番重要な争点・決定事項は何か」を意識してメリハリをつけてください。
- conclusionは、読んだ人が数秒で「結局どうなったか」がわかるように、最も重要な結論を一文で書いてください。「〜について説明した」「〜と答弁した」のような抽象的な言い回しだけで終わらせず、可能な限り具体的な内容（金額、時期、実施の有無、方針転換など）を含めてください。
- pointsも同様に、本文の内容を満遍なくなぞるのではなく、特に重要な論点を優先して選んでください。

本文に記載のない内容は推測せず、不明な場合は空文字にしてください。

以下のJSON形式で出力してください。

{
  "points": ["論点1", "論点2", ...],
  "conclusion": "最も重要な結論を100字程度で、具体的に"
}`;
}
