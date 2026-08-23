import { POLICY_TAG_LABEL_MAP } from "@mirai-gikai/shared/policy-tags";
import type { Route } from "next";
import Link from "next/link";
import { groupByPolicyTag, pickFeatured } from "@/lib/policy-tag-grouping";
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

  const featured = pickFeatured(questions);
  const groups = groupByPolicyTag(questions);

  return (
    <div className="flex flex-col gap-8">
      {featured.length > 0 && (
        <GeneralQuestionSection
          heading="注目の一般質問"
          questions={featured}
          assemblyId={assemblyId}
        />
      )}

      {groups.map((group) => (
        <GeneralQuestionSection
          key={group.tag}
          heading={POLICY_TAG_LABEL_MAP[group.tag]}
          questions={group.items}
          assemblyId={assemblyId}
        />
      ))}
    </div>
  );
}

interface GeneralQuestionSectionProps {
  heading: string;
  questions: GeneralQuestionWithMember[];
  assemblyId: string;
}

function GeneralQuestionSection({
  heading,
  questions,
  assemblyId,
}: GeneralQuestionSectionProps) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-lg font-bold text-primary">{heading}</h2>
      <div className="flex flex-col gap-3">
        {questions.map((question) => (
          <Link
            key={question.id}
            href={
              routes.generalQuestionDetail(assemblyId, question.id) as Route
            }
          >
            <GeneralQuestionCard question={question} />
          </Link>
        ))}
      </div>
    </section>
  );
}
