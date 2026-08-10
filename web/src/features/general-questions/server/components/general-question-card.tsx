import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import type { GeneralQuestionWithMember } from "../../shared/types";

interface GeneralQuestionCardProps {
  question: GeneralQuestionWithMember;
}

export function GeneralQuestionCard({ question }: GeneralQuestionCardProps) {
  return (
    <Card className="border border-black hover:bg-muted/50 transition-colors">
      <CardHeader>
        <div className="flex flex-col gap-2">
          <span className="text-xs font-medium text-muted-foreground">
            {question.order_number}番 {question.council_member.name}議員
          </span>
          <CardTitle className="text-xl/7 tracking-normal">
            {question.title}
          </CardTitle>
        </div>
      </CardHeader>
    </Card>
  );
}
