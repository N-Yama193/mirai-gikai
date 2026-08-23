"use client";

import {
  isPolicyTagKey,
  POLICY_TAGS,
  type PolicyTagKey,
} from "@mirai-gikai/shared/policy-tags";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";

interface PolicyTagEditorProps {
  /** input要素のidを一覧内で一意にするための接頭辞（対象レコードのidなど） */
  idPrefix: string;
  initialTags: string[];
  initialFeatured: boolean;
  onSave: (input: {
    policyTags: PolicyTagKey[];
    isFeatured: boolean;
  }) => Promise<{ error?: string }>;
}

/**
 * 議案・一般質問のテーマ別タグ(policy_tags)と注目フラグ(is_featured)を
 * 手動編集するための共通UI。AI要約一覧の各行に埋め込んで使う。
 * タグ付けはAIではなく管理者の手動選択（Phase5設計仕様）。
 */
export function PolicyTagEditor({
  idPrefix,
  initialTags,
  initialFeatured,
  onSave,
}: PolicyTagEditorProps) {
  const router = useRouter();
  const [tags, setTags] = useState<Set<PolicyTagKey>>(
    () => new Set(initialTags.filter(isPolicyTagKey))
  );
  const [featured, setFeatured] = useState(initialFeatured);
  const [isSaving, setIsSaving] = useState(false);

  const toggleTag = (tag: PolicyTagKey, checked: boolean) => {
    setTags((prev) => {
      const next = new Set(prev);
      if (checked) {
        next.add(tag);
      } else {
        next.delete(tag);
      }
      return next;
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const result = await onSave({
        policyTags: Array.from(tags),
        isFeatured: featured,
      });
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("タグ・注目設定を保存しました");
        router.refresh();
      }
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 rounded-md border border-dashed p-3">
      <div className="flex flex-wrap gap-3">
        {POLICY_TAGS.map((t) => (
          <div key={t.key} className="flex items-center gap-1.5 text-sm">
            <Checkbox
              id={`policy-tag-${idPrefix}-${t.key}`}
              checked={tags.has(t.key)}
              onCheckedChange={(checked) => toggleTag(t.key, checked === true)}
            />
            <label htmlFor={`policy-tag-${idPrefix}-${t.key}`}>{t.label}</label>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm">
          <Switch
            id={`policy-tag-${idPrefix}-featured`}
            checked={featured}
            onCheckedChange={setFeatured}
          />
          <label htmlFor={`policy-tag-${idPrefix}-featured`}>
            注目に設定する
          </label>
        </div>
        <Button
          size="sm"
          variant="outline"
          onClick={handleSave}
          disabled={isSaving}
        >
          タグ設定を保存
        </Button>
      </div>
    </div>
  );
}
