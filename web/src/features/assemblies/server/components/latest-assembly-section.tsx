import Link from "next/link";
import type { Route } from "next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDateWithDots } from "@/lib/utils/date";
import { routes } from "@/lib/routes";
import type { Assembly } from "../../shared/types";

interface LatestAssemblySectionProps {
  assembly: Assembly;
}

/**
 * トップページの主役となる「直近の定例会」セクション。
 * 議案・一般質問への導線をここに集約する。
 */
export function LatestAssemblySection({
  assembly,
}: LatestAssemblySectionProps) {
  return (
    <section className="rounded-3xl border border-[#eee] bg-white p-6 shadow-[7px_9px_18px_rgba(23,74,104,0.28)] md:p-8">
      <div className="flex flex-col gap-4">
        <Badge className="w-fit rounded-full border-transparent bg-hirokawa-blue text-kasuri-white">
          最新の定例会
        </Badge>

        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="outline">{assembly.session_type}</Badge>
          <span className="text-xs font-medium text-muted-foreground">
            {formatDateWithDots(assembly.start_date)} 〜{" "}
            {formatDateWithDots(assembly.end_date)}
          </span>
        </div>

        <h2 className="text-2xl font-bold leading-[1.4] text-hirokawa-indigo md:text-3xl">
          {assembly.name}
        </h2>

        {assembly.total_agenda_items != null && (
          <p className="text-sm font-medium text-mirai-text">
            提出議案 {assembly.total_agenda_items}件
          </p>
        )}

        <div className="flex flex-wrap gap-3 pt-1">
          <Button asChild size="lg">
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
    </section>
  );
}
