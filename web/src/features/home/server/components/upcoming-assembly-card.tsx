import { CalendarClock, ExternalLink, MapPin } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { UPCOMING_ASSEMBLY } from "@/config/upcoming-assembly";

/**
 * トップページの「次の議会（傍聴案内）」カード。
 * web/src/config/upcoming-assembly.ts が null のときは何も表示しない。
 */
export function UpcomingAssemblyCard() {
  if (!UPCOMING_ASSEMBLY) {
    return null;
  }

  const {
    name,
    sessionPeriod,
    generalQuestionSchedule,
    venue,
    visitInfo,
    referenceUrl,
    referenceLabel,
  } = UPCOMING_ASSEMBLY;

  return (
    <section className="rounded-3xl border border-mirai-border-light bg-white p-6 md:p-8">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-hirokawa-blue/10">
            <CalendarClock
              className="h-5 w-5 text-hirokawa-blue"
              strokeWidth={1.75}
            />
          </div>
          <Badge className="w-fit rounded-full border-transparent bg-hirokawa-blue text-kasuri-white">
            次の議会・傍聴案内
          </Badge>
        </div>

        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-bold text-hirokawa-indigo md:text-2xl">
            {name}
          </h2>
          <p className="text-sm font-medium text-mirai-text-subtle">
            会期: {sessionPeriod}
          </p>
        </div>

        <div className="flex flex-col gap-1 text-sm text-mirai-text">
          <p>一般質問(本会議): {generalQuestionSchedule}</p>
          <p className="flex items-center gap-1">
            <MapPin className="h-4 w-4 shrink-0 text-mirai-text-subtle" />
            {venue}
          </p>
        </div>

        <p className="text-sm text-mirai-text-subtle">{visitInfo}</p>

        <Link
          href={referenceUrl as Route}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-fit items-center gap-1 text-sm font-bold text-hirokawa-indigo hover:underline"
        >
          {referenceLabel}
          <ExternalLink className="h-3.5 w-3.5" />
        </Link>
      </div>
    </section>
  );
}
