import type { Database } from "@mirai-gikai/supabase";

// Database types
export type AgendaItem = Database["public"]["Tables"]["agenda_items"]["Row"];
export type AgendaSummary =
  Database["public"]["Tables"]["agenda_summaries"]["Row"];

// category/statusはDB側がtext + check制約のため、アプリ側で明示的にユニオン型を定義する
export type AgendaItemCategory =
  | "決算認定"
  | "報告"
  | "人事案件"
  | "条例の制定"
  | "条例の改正"
  | "補正予算"
  | "規約変更"
  | "その他";

export type AgendaItemStatus = "可決" | "否決" | "継続審査" | "撤回" | "未審議";

// ai_summary_statusもDB側がtext + check制約のため、アプリ側でユニオン型を定義する
export type AiSummaryStatus = "none" | "draft" | "published";

// ai_summaryはDB側がjsonb型のため、アプリ側で内容の型を定義する
export type AiSummaryContent = {
  points: string[];
  conclusion: string;
};

// Combined types for UI
export type AgendaItemDetail = AgendaItem & {
  summaries: AgendaSummary[];
};
