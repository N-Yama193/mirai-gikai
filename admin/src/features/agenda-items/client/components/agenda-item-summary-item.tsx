"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { generateAgendaSummary } from "../../server/actions/generate-agenda-summary";
import { publishAgendaSummary } from "../../server/actions/publish-agenda-summary";
import type { AgendaItemSummaryListRow } from "../../shared/types";

type AgendaItemSummaryItemProps = {
  item: AgendaItemSummaryListRow;
};

const STATUS_LABEL: Record<
  AgendaItemSummaryListRow["ai_summary_status"],
  string
> = {
  none: "未生成",
  draft: "下書き",
  published: "公開済み",
};

export function AgendaItemSummaryItem({ item }: AgendaItemSummaryItemProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleGenerate = async () => {
    setIsSubmitting(true);
    try {
      const result = await generateAgendaSummary({ id: item.id });
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("AI要約を生成しました（下書き）");
        router.refresh();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePublish = async () => {
    setIsSubmitting(true);
    try {
      const result = await publishAgendaSummary({ id: item.id });
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("AI要約を公開しました");
        router.refresh();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 rounded-lg border p-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 font-medium">
            <span className="text-sm text-gray-500">{item.item_number}</span>
            {item.title}
            <Badge
              variant={
                item.ai_summary_status === "published" ? "default" : "outline"
              }
            >
              {STATUS_LABEL[item.ai_summary_status]}
            </Badge>
            {item.isOutdated && (
              <Badge variant="destructive">本文が変更されています</Badge>
            )}
          </div>
          {item.ai_summary && (
            <div className="mt-2 text-sm text-gray-600">
              <ul className="list-disc list-inside">
                {item.ai_summary.points
                  .filter((point) => point.trim().length > 0)
                  .map((point, index) => (
                    <li key={`${item.id}-${index}`}>{point}</li>
                  ))}
              </ul>
              <p className="mt-1">{item.ai_summary.conclusion}</p>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleGenerate}
            disabled={isSubmitting}
          >
            {item.ai_summary_status === "none" ? "生成" : "再生成"}
          </Button>
          {item.ai_summary_status === "draft" && (
            <Button size="sm" onClick={handlePublish} disabled={isSubmitting}>
              公開する
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
