import type { Database } from "@mirai-gikai/supabase";

// Database types
export type Assembly = Database["public"]["Tables"]["assemblies"]["Row"];

// session_typeはDB側がtext + check制約のため、アプリ側で明示的にユニオン型を定義する
export type SessionType = "定例会" | "臨時会";
