import { createHash } from "node:crypto";

/**
 * AI要約の再生成要否判定に使う、本文のsha256ハッシュを計算する
 */
export function hashContent(text: string): string {
  return createHash("sha256").update(text).digest("hex");
}
