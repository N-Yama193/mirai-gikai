import { Badge } from "@/components/ui/badge";
import type { QuestionTopicWithSummaries } from "../../shared/types";

interface QuestionTopicSectionProps {
  topic: QuestionTopicWithSummaries;
}

export function QuestionTopicSection({ topic }: QuestionTopicSectionProps) {
  // AI要約(detail優先、無ければeasy)があればそちらを表示し、無ければ会議録原文を表示する
  const summary =
    topic.summaries.find((s) => s.mode === "detail") ??
    topic.summaries.find((s) => s.mode === "easy");

  return (
    <section className="flex flex-col gap-3 py-6 border-b border-gray-200 last:border-b-0">
      <div className="flex items-center gap-2">
        {topic.department && (
          <Badge variant="outline">{topic.department}</Badge>
        )}
        <h3 className="text-lg font-bold text-black">{topic.topic_title}</h3>
      </div>
      <p className="text-sm leading-relaxed whitespace-pre-wrap">
        {summary?.content ?? topic.raw_excerpt}
      </p>
    </section>
  );
}
