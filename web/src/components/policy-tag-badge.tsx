import {
  isPolicyTagKey,
  POLICY_TAG_COLOR_MAP,
  POLICY_TAG_LABEL_MAP,
  type PolicyTagKey,
} from "@mirai-gikai/shared/policy-tags";
import { cn } from "@/lib/utils";

interface PolicyTagBadgeProps {
  tag: PolicyTagKey;
  className?: string;
}

/** 議案・一般質問のテーマ別タグ(policy_tags)を1件表示するバッジ */
export function PolicyTagBadge({ tag, className }: PolicyTagBadgeProps) {
  const color = POLICY_TAG_COLOR_MAP[tag];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-medium whitespace-nowrap",
        className
      )}
      style={{ borderColor: color, color }}
    >
      <span
        className="inline-block h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: color }}
      />
      {POLICY_TAG_LABEL_MAP[tag]}
    </span>
  );
}

interface PolicyTagBadgeListProps {
  tags: string[] | null | undefined;
  className?: string;
}

/** policy_tags(string[])を受け取り、既知のタグのみバッジ一覧として表示する */
export function PolicyTagBadgeList({
  tags,
  className,
}: PolicyTagBadgeListProps) {
  const validTags = (tags ?? []).filter(isPolicyTagKey);

  if (validTags.length === 0) {
    return null;
  }

  return (
    <div className={cn("flex flex-wrap gap-1", className)}>
      {validTags.map((tag) => (
        <PolicyTagBadge key={tag} tag={tag} />
      ))}
    </div>
  );
}
