import "server-only";
import { createAdminClient } from "@mirai-gikai/supabase";
import type {
  AiSummaryContent,
  GeneralQuestionSummaryRow,
} from "../../shared/types";

/**
 * AI要約管理画面向けに、一般質問一覧を配下のquestion_topics付きで取得
 */
export async function findAllGeneralQuestionsForSummary(): Promise<
  GeneralQuestionSummaryRow[]
> {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("general_questions")
    .select(
      `
      id,
      order_number,
      title,
      ai_summary,
      ai_summary_status,
      ai_summary_generated_at,
      ai_summary_published_at,
      ai_summary_source_hash,
      policy_tags,
      is_featured,
      question_topics ( raw_excerpt )
    `
    )
    .order("order_number", { ascending: true });

  if (error) {
    console.error("Failed to fetch general questions for summary:", error);
    return [];
  }

  return data.map((question) => ({
    ...question,
    topics: question.question_topics,
    ai_summary: question.ai_summary as AiSummaryContent | null,
    ai_summary_status:
      question.ai_summary_status as GeneralQuestionSummaryRow["ai_summary_status"],
  }));
}

/**
 * 一般質問1件を、配下のquestion_topics付きで取得（要約生成用）
 */
export async function findGeneralQuestionForSummary(
  id: string
): Promise<Pick<GeneralQuestionSummaryRow, "id" | "title" | "topics"> | null> {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("general_questions")
    .select("id, title, question_topics ( raw_excerpt )")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("Failed to fetch general question for summary:", error);
    return null;
  }

  if (!data) {
    return null;
  }

  return { ...data, topics: data.question_topics };
}

/**
 * AI要約を保存する（生成直後はdraftとして保存）
 */
export async function saveGeneralQuestionSummary(
  id: string,
  input: {
    aiSummary: AiSummaryContent;
    sourceHash: string;
  }
): Promise<void> {
  const supabase = createAdminClient();

  const { error } = await supabase
    .from("general_questions")
    .update({
      ai_summary: input.aiSummary,
      ai_summary_status: "draft",
      ai_summary_generated_at: new Date().toISOString(),
      ai_summary_source_hash: input.sourceHash,
    })
    .eq("id", id);

  if (error) {
    throw new Error(
      `Failed to save general question summary: ${error.message}`
    );
  }
}

/**
 * 一般質問のテーマ別タグ(policy_tags)と注目フラグ(is_featured)を更新する
 * （管理者による手動設定。AI要約とは独立した項目）
 */
export async function updateGeneralQuestionTags(
  id: string,
  input: {
    policyTags: string[];
    isFeatured: boolean;
  }
): Promise<void> {
  const supabase = createAdminClient();

  const { error } = await supabase
    .from("general_questions")
    .update({
      policy_tags: input.policyTags,
      is_featured: input.isFeatured,
    })
    .eq("id", id);

  if (error) {
    throw new Error(`Failed to update general question tags: ${error.message}`);
  }
}

/**
 * AI要約を公開する（draft -> published）
 */
export async function publishGeneralQuestionSummary(id: string): Promise<void> {
  const supabase = createAdminClient();

  const { error } = await supabase
    .from("general_questions")
    .update({
      ai_summary_status: "published",
      ai_summary_published_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    throw new Error(
      `Failed to publish general question summary: ${error.message}`
    );
  }
}
