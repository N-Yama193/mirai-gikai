import {
  isPolicyTagKey,
  POLICY_TAGS,
  type PolicyTagKey,
  UNTAGGED_KEY,
} from "@mirai-gikai/shared/policy-tags";

export interface PolicyTagGroup<T> {
  tag: PolicyTagKey;
  items: T[];
}

/**
 * policy_tagsを持つ項目を、タグごとにグルーピングする。
 * 1件が複数タグを持つ場合は該当する全グループに重複して含める。
 * タグが未設定の項目は「その他」(UNTAGGED_KEY)に集約する。
 * 空のグループは結果に含めない。
 */
export function groupByPolicyTag<T extends { policy_tags: string[] | null }>(
  items: T[]
): PolicyTagGroup<T>[] {
  const buckets = new Map<PolicyTagKey, T[]>();

  for (const item of items) {
    const tags: PolicyTagKey[] = (item.policy_tags ?? []).filter(
      isPolicyTagKey
    );
    const effectiveTags: PolicyTagKey[] =
      tags.length > 0 ? tags : [UNTAGGED_KEY];

    for (const tag of effectiveTags) {
      const bucket = buckets.get(tag);
      if (bucket) {
        bucket.push(item);
      } else {
        buckets.set(tag, [item]);
      }
    }
  }

  return POLICY_TAGS.map((t) => t.key)
    .map((tag) => ({ tag, items: buckets.get(tag) ?? [] }))
    .filter((group) => group.items.length > 0);
}

/** is_featuredがtrueの項目のみ抽出する */
export function pickFeatured<T extends { is_featured: boolean }>(
  items: T[]
): T[] {
  return items.filter((item) => item.is_featured);
}
