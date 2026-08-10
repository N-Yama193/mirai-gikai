import "server-only";
import { createAdminClient } from "@mirai-gikai/supabase";

/**
 * 定例会IDに紐づく一般質問一覧を、答弁議員情報付きで取得
 */
export async function findGeneralQuestionsByAssemblyId(assemblyId: string) {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("general_questions")
    .select("*, council_members(*)")
    .eq("assembly_id", assemblyId)
    .order("order_number", { ascending: true });

  if (error) {
    console.error("Failed to fetch general questions:", error);
    return [];
  }

  return data;
}

/**
 * IDで一般質問を、議員情報・論点・論点要約付きで取得
 */
export async function findGeneralQuestionById(id: string) {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("general_questions")
    .select(
      `
      *,
      council_members (*),
      question_topics (
        *,
        question_topic_summaries (*)
      )
    `
    )
    .eq("id", id)
    .order("display_order", {
      ascending: true,
      referencedTable: "question_topics",
    })
    .maybeSingle();

  if (error) {
    console.error("Failed to fetch general question by id:", error);
    return null;
  }

  return data;
}
