import type { Database } from "@mirai-gikai/supabase";

// Database types
export type GeneralQuestion =
  Database["public"]["Tables"]["general_questions"]["Row"];
export type QuestionTopic =
  Database["public"]["Tables"]["question_topics"]["Row"];
export type QuestionTopicSummary =
  Database["public"]["Tables"]["question_topic_summaries"]["Row"];
export type CouncilMember =
  Database["public"]["Tables"]["council_members"]["Row"];

// ai_summary_statusもDB側がtext + check制約のため、アプリ側でユニオン型を定義する
export type AiSummaryStatus = "none" | "draft" | "published";

// ai_summaryはDB側がjsonb型のため、アプリ側で内容の型を定義する
export type AiSummaryContent = {
  points: string[];
  conclusion: string;
};

// Combined types for UI
export type GeneralQuestionWithMember = GeneralQuestion & {
  council_member: CouncilMember;
};

export type QuestionTopicWithSummaries = QuestionTopic & {
  summaries: QuestionTopicSummary[];
};

export type GeneralQuestionDetail = GeneralQuestionWithMember & {
  topics: QuestionTopicWithSummaries[];
};
