import Link from "next/link";
import type { Route } from "next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDateWithDots } from "@/lib/utils/date";
import { routes } from "@/lib/routes";
import type { Assembly } from "../../shared/types";

interface AssemblyCardProps {
  assembly: Assembly;
}

export function AssemblyCard({ assembly }: AssemblyCardProps) {
  return (
    <Card className="rounded-3xl border-[0.5px] border-mirai-border-light">
      <CardHeader>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <Badge variant="outline">{assembly.session_type}</Badge>
            <span className="text-xs font-medium text-muted-foreground">
              {formatDateWithDots(assembly.start_date)} 〜{" "}
              {formatDateWithDots(assembly.end_date)}
            </span>
          </div>
          <CardTitle className="text-[22px]/8 tracking-normal">
            {assembly.name}
          </CardTitle>
          {assembly.total_agenda_items != null && (
            <span className="text-xs font-medium text-muted-foreground">
              提出議案 {assembly.total_agenda_items}件
            </span>
          )}
          <div className="flex flex-wrap gap-3 pt-1">
            <Button variant="outline" size="lg" asChild>
              <Link href={routes.agendaItemList(assembly.id) as Route}>
                議案を見る
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href={routes.generalQuestionList(assembly.id) as Route}>
                一般質問を見る
              </Link>
            </Button>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
