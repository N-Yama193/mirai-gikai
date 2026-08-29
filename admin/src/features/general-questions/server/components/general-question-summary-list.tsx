import { GeneralQuestionSummaryItem } from "../../client/components/general-question-summary-item";
import type { GeneralQuestionSummaryListRow } from "../../shared/types";

type GeneralQuestionSummaryListProps = {
  questions: GeneralQuestionSummaryListRow[];
};

/**
 * 一般質問一覧を所属する議会(定例会・臨時会)ごとにグループ化する。
 * 入力はリポジトリ側で議会の開催日降順・登壇順にソート済みのため、
 * ここでは登場順を保ったままグループ化するだけでよい。
 */
function groupByAssembly(questions: GeneralQuestionSummaryListRow[]) {
  const groups: {
    assembly: GeneralQuestionSummaryListRow["assembly"];
    questions: GeneralQuestionSummaryListRow[];
  }[] = [];

  for (const question of questions) {
    const lastGroup = groups[groups.length - 1];
    if (lastGroup && lastGroup.assembly.id === question.assembly.id) {
      lastGroup.questions.push(question);
    } else {
      groups.push({ assembly: question.assembly, questions: [question] });
    }
  }

  return groups;
}

export function GeneralQuestionSummaryList({
  questions,
}: GeneralQuestionSummaryListProps) {
  const groups = groupByAssembly(questions);

  return (
    <div className="space-y-8">
      <h2 className="text-lg font-semibold">
        一般質問AI要約一覧 ({questions.length}件)
      </h2>

      {questions.length === 0 ? (
        <p className="text-gray-500">一般質問がありません</p>
      ) : (
        groups.map(({ assembly, questions: groupQuestions }) => (
          <div key={assembly.id} className="space-y-2">
            <h3 className="text-base font-semibold text-gray-700 border-b pb-1">
              {assembly.name} ({groupQuestions.length}件)
            </h3>
            <div className="space-y-2">
              {groupQuestions.map((question) => (
                <GeneralQuestionSummaryItem
                  key={question.id}
                  question={question}
                />
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
