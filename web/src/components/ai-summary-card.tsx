import { Card, CardContent } from "@/components/ui/card";

interface AiSummaryCardProps {
  points: string[];
  conclusion: string;
}

export function AiSummaryCard({ points, conclusion }: AiSummaryCardProps) {
  return (
    <Card className="border border-mirai-highlight bg-mirai-surface-muted">
      <CardContent className="flex flex-col gap-3">
        <p className="text-xs font-bold text-primary-accent">AIによる要約</p>
        <ul className="list-disc list-inside flex flex-col gap-1 text-sm">
          {points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
        <p className="text-sm font-medium">{conclusion}</p>
      </CardContent>
    </Card>
  );
}
