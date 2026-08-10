import type { GeneralQuestionDetail as GeneralQuestionDetailType } from "../../shared/types";
import { QuestionTopicSection } from "./question-topic-section";

interface GeneralQuestionDetailProps {
  question: GeneralQuestionDetailType;
}

export function GeneralQuestionDetail({
  question,
}: GeneralQuestionDetailProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <span className="text-sm font-medium text-muted-foreground">
          {question.order_number}番 {question.council_member.name}議員
          {question.council_member.party_group &&
            `（${question.council_member.party_group}）`}
        </span>
        <h1 className="text-[22px] font-bold text-black leading-[1.48]">
          {question.title}
        </h1>
      </div>

      <div className="flex flex-col">
        {question.topics.map((topic) => (
          <QuestionTopicSection key={topic.id} topic={topic} />
        ))}
      </div>
    </div>
  );
}
