import { permanentRedirect } from "next/navigation";
import { routes } from "@/lib/routes";

/**
 * Phase 4 で定例会一覧をトップページに統合したため、このURLは廃止した。
 * 既存のブックマークや外部リンクを切らさないよう、恒久リダイレクトを返す。
 * 配下の /gikai/[assemblyId]/... （議案・一般質問）は引き続き有効。
 */
export default function GikaiPage() {
  permanentRedirect(routes.home());
}
