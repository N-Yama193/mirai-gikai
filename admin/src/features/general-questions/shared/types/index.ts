export type AiSummaryStatus = "none" | "draft" | "published";

export type AiSummaryContent = {
  points: string[];
  conclusion: string;
};

export type GeneralQuestionSummaryRow = {
  id: string;
  order_number: number;
  title: string;
  topics: { raw_excerpt: string }[];
  ai_summary: AiSummaryContent | null;
  ai_summary_status: AiSummaryStatus;
  ai_summary_generated_at: string | null;
  ai_summary_published_at: string | null;
  ai_summary_source_hash: string | null;
};

export type GeneralQuestionSummaryListRow = GeneralQuestionSummaryRow & {
  /** published時点の要約が現在の本文と一致しないか（サーバー側で計算） */
  isOutdated: boolean;
};
