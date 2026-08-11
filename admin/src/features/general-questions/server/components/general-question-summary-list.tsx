import { GeneralQuestionSummaryItem } from "../../client/components/general-question-summary-item";
import type { GeneralQuestionSummaryListRow } from "../../shared/types";

type GeneralQuestionSummaryListProps = {
  questions: GeneralQuestionSummaryListRow[];
};

export function GeneralQuestionSummaryList({
  questions,
}: GeneralQuestionSummaryListProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">
        一般質問AI要約一覧 ({questions.length}件)
      </h2>

      {questions.length === 0 ? (
        <p className="text-gray-500">一般質問がありません</p>
      ) : (
        <div className="space-y-2">
          {questions.map((question) => (
            <GeneralQuestionSummaryItem key={question.id} question={question} />
          ))}
        </div>
      )}
    </div>
  );
}
