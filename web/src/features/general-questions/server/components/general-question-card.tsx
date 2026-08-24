import { FeaturedBadge } from "@/components/featured-badge";
import { PolicyTagBadgeList } from "@/components/policy-tag-badge";
import { RubySafeLineClamp } from "@/components/ruby-safe-line-clamp";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type {
  AiSummaryContent,
  GeneralQuestionWithMember,
} from "../../shared/types";

interface GeneralQuestionCardProps {
  question: GeneralQuestionWithMember;
}

export function GeneralQuestionCard({ question }: GeneralQuestionCardProps) {
  const conclusion =
    question.ai_summary_status === "published"
      ? (question.ai_summary as AiSummaryContent | null)?.conclusion
      : null;

  return (
    <Card className="border border-black hover:bg-muted/50 transition-colors">
      <CardHeader>
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2">
            {question.is_featured && <FeaturedBadge />}
            <span className="text-xs font-medium text-muted-foreground">
              {question.order_number}番 {question.council_member.name}議員
            </span>
          </div>
          <CardTitle className="text-xl/7 tracking-normal">
            {question.title}
          </CardTitle>
        </div>
      </CardHeader>
      {(conclusion || question.policy_tags?.length > 0) && (
        <CardContent className="flex flex-col gap-2">
          {conclusion && (
            <RubySafeLineClamp
              text={conclusion}
              lineClamp={2}
              className="text-sm text-muted-foreground"
            />
          )}
          <PolicyTagBadgeList tags={question.policy_tags} />
        </CardContent>
      )}
    </Card>
  );
}
