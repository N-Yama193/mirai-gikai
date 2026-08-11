import { AI_MODELS } from "@/lib/ai/models";

/** 議案AI要約生成で使用するモデル */
export const AGENDA_SUMMARY_MODEL = AI_MODELS.claude_sonnet_5;

export function buildAgendaSummaryPrompt(agendaBody: string): string {
  return `あなたは町議会の議事録要約アシスタントです。
以下の議案の提案理由・審議内容を要約してください。

【本文】
${agendaBody}

以下のJSON形式で出力してください。本文に記載のない内容は推測せず、不明な場合は空文字にしてください。

{
  "points": ["審議のポイント1", "審議のポイント2", ...],
  "conclusion": "議案の要旨・結論を100字程度で"
}`;
}
