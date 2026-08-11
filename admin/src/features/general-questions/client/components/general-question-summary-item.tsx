"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { generateGeneralQuestionSummary } from "../../server/actions/generate-general-question-summary";
import { publishGeneralQuestionSummary } from "../../server/actions/publish-general-question-summary";
import type { GeneralQuestionSummaryListRow } from "../../shared/types";

type GeneralQuestionSummaryItemProps = {
  question: GeneralQuestionSummaryListRow;
};

const STATUS_LABEL: Record<
  GeneralQuestionSummaryListRow["ai_summary_status"],
  string
> = {
  none: "未生成",
  draft: "下書き",
  published: "公開済み",
};

export function GeneralQuestionSummaryItem({
  question,
}: GeneralQuestionSummaryItemProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleGenerate = async () => {
    setIsSubmitting(true);
    try {
      const result = await generateGeneralQuestionSummary({
        id: question.id,
      });
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
      const result = await publishGeneralQuestionSummary({
        id: question.id,
      });
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
            <span className="text-sm text-gray-500">
              {question.order_number}番
            </span>
            {question.title}
            <Badge
              variant={
                question.ai_summary_status === "published"
                  ? "default"
                  : "outline"
              }
            >
              {STATUS_LABEL[question.ai_summary_status]}
            </Badge>
            {question.isOutdated && (
              <Badge variant="destructive">本文が変更されています</Badge>
            )}
          </div>
          {question.ai_summary && (
            <div className="mt-2 text-sm text-gray-600">
              <ul className="list-disc list-inside">
                {question.ai_summary.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <p className="mt-1">{question.ai_summary.conclusion}</p>
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
            {question.ai_summary_status === "none" ? "生成" : "再生成"}
          </Button>
          {question.ai_summary_status === "draft" && (
            <Button size="sm" onClick={handlePublish} disabled={isSubmitting}>
              公開する
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
