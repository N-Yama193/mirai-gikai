/**
 * 議案・一般質問に付与するテーマ別タグ（policy_tags）の固定語彙。
 * Phase5設計仕様（docs/Phase5_議案一般質問トピック表示改善_設計仕様.md）に基づく。
 * AIによる自動判定は行わず、admin画面で管理者が手動選択する運用のため、値は固定リストとする。
 */
export const POLICY_TAGS = [
  {
    key: "kurashi_fukushi",
    label: "くらし・福祉",
    color: "#C75A61", // Berry
  },
  {
    key: "machizukuri_bosai",
    label: "まちづくり・防災",
    color: "#5E8060", // Green
  },
  {
    key: "kyoiku",
    label: "教育",
    color: "#D6A92C", // Ginkgo Yellow
  },
  {
    key: "sangyo_chiiki",
    label: "産業・地域振興",
    color: "#D99A42", // Kiku
  },
  {
    key: "zaisei_gyosei",
    label: "財政・行政経営",
    color: "#79547D", // Grape
  },
  {
    key: "kankyo_kiban",
    label: "環境・くらしの基盤",
    color: "#174A68", // Hirokawa Blue
  },
  {
    key: "sonota",
    label: "その他",
    color: "#6B7280", // Gray
  },
] as const;

export type PolicyTagKey = (typeof POLICY_TAGS)[number]["key"];

export const POLICY_TAG_LABEL_MAP: Record<PolicyTagKey, string> =
  Object.fromEntries(POLICY_TAGS.map((t) => [t.key, t.label])) as Record<
    PolicyTagKey,
    string
  >;

export const POLICY_TAG_COLOR_MAP: Record<PolicyTagKey, string> =
  Object.fromEntries(POLICY_TAGS.map((t) => [t.key, t.color])) as Record<
    PolicyTagKey,
    string
  >;

export function isPolicyTagKey(value: string): value is PolicyTagKey {
  return POLICY_TAGS.some((t) => t.key === value);
}

/** "その他"タグのkey。タグが未設定の項目の受け皿として使う */
export const UNTAGGED_KEY = "sonota" satisfies PolicyTagKey;
