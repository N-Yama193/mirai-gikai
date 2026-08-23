import "server-only";
import { createAdminClient } from "@mirai-gikai/supabase";
import type {
  AgendaItemSummaryRow,
  AiSummaryContent,
} from "../../shared/types";

/**
 * AI要約管理画面向けに、議案一覧を取得
 */
export async function findAllAgendaItemsForSummary(): Promise<
  AgendaItemSummaryRow[]
> {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("agenda_items")
    .select(
      "id, item_number, title, proposal_reason, ai_summary, ai_summary_status, ai_summary_generated_at, ai_summary_published_at, ai_summary_source_hash, policy_tags, is_featured"
    )
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Failed to fetch agenda items for summary:", error);
    return [];
  }

  return data.map((item) => ({
    ...item,
    ai_summary: item.ai_summary as AiSummaryContent | null,
    ai_summary_status:
      item.ai_summary_status as AgendaItemSummaryRow["ai_summary_status"],
  }));
}

/**
 * 議案1件を取得（要約生成用）
 */
export async function findAgendaItemForSummary(
  id: string
): Promise<Pick<
  AgendaItemSummaryRow,
  "id" | "title" | "proposal_reason"
> | null> {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("agenda_items")
    .select("id, title, proposal_reason")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("Failed to fetch agenda item for summary:", error);
    return null;
  }

  return data;
}

/**
 * AI要約を保存する（生成直後はdraftとして保存）
 */
export async function saveAgendaItemSummary(
  id: string,
  input: {
    aiSummary: AiSummaryContent;
    sourceHash: string;
  }
): Promise<void> {
  const supabase = createAdminClient();

  const { error } = await supabase
    .from("agenda_items")
    .update({
      ai_summary: input.aiSummary,
      ai_summary_status: "draft",
      ai_summary_generated_at: new Date().toISOString(),
      ai_summary_source_hash: input.sourceHash,
    })
    .eq("id", id);

  if (error) {
    throw new Error(`Failed to save agenda item summary: ${error.message}`);
  }
}

/**
 * 議案のテーマ別タグ(policy_tags)と注目フラグ(is_featured)を更新する
 * （管理者による手動設定。AI要約とは独立した項目）
 */
export async function updateAgendaItemTags(
  id: string,
  input: {
    policyTags: string[];
    isFeatured: boolean;
  }
): Promise<void> {
  const supabase = createAdminClient();

  const { error } = await supabase
    .from("agenda_items")
    .update({
      policy_tags: input.policyTags,
      is_featured: input.isFeatured,
    })
    .eq("id", id);

  if (error) {
    throw new Error(`Failed to update agenda item tags: ${error.message}`);
  }
}

/**
 * AI要約を公開する（draft -> published）
 */
export async function publishAgendaItemSummary(id: string): Promise<void> {
  const supabase = createAdminClient();

  const { error } = await supabase
    .from("agenda_items")
    .update({
      ai_summary_status: "published",
      ai_summary_published_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    throw new Error(`Failed to publish agenda item summary: ${error.message}`);
  }
}
