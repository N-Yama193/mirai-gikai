import "server-only";
import { createAdminClient } from "@mirai-gikai/supabase";
import type { Assembly } from "../../shared/types";

/**
 * 定例会・臨時会の一覧を取得（新しい会期順）
 */
export async function findAllAssemblies(): Promise<Assembly[]> {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("assemblies")
    .select("*")
    .order("fiscal_year", { ascending: false })
    .order("session_number", { ascending: false });

  if (error) {
    console.error("Failed to fetch assemblies:", error);
    return [];
  }

  return data;
}

/**
 * IDで定例会・臨時会を取得
 */
export async function findAssemblyById(id: string): Promise<Assembly | null> {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("assemblies")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("Failed to fetch assembly by id:", error);
    return null;
  }

  return data;
}
