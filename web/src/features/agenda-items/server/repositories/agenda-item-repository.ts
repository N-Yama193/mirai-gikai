import "server-only";
import { createAdminClient } from "@mirai-gikai/supabase";

/**
 * 定例会IDに紐づく議案一覧を取得
 */
export async function findAgendaItemsByAssemblyId(assemblyId: string) {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("agenda_items")
    .select("*")
    .eq("assembly_id", assemblyId)
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Failed to fetch agenda items:", error);
    return [];
  }

  return data;
}

/**
 * IDで議案を、AI要約付きで取得
 */
export async function findAgendaItemById(id: string) {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("agenda_items")
    .select(
      `
      *,
      agenda_summaries (*)
    `
    )
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("Failed to fetch agenda item by id:", error);
    return null;
  }

  return data;
}
