import Link from "next/link";
import type { Route } from "next";
import { routes } from "@/lib/routes";
import type { GeneralQuestionWithMember } from "../../shared/types";
import { GeneralQuestionCard } from "./general-question-card";

interface GeneralQuestionListProps {
  assemblyId: string;
  questions: GeneralQuestionWithMember[];
}

export function GeneralQuestionList({
  assemblyId,
  questions,
}: GeneralQuestionListProps) {
  if (questions.length === 0) {
    return (
      <p className="text-center py-12 text-muted-foreground">
        この定例会の一般質問はまだ登録されていません
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {questions.map((question) => (
        <Link
          key={question.id}
          href={routes.generalQuestionDetail(assemblyId, question.id) as Route}
        >
          <GeneralQuestionCard question={question} />
        </Link>
      ))}
    </div>
  );
}
