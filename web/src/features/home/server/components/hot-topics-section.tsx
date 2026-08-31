import { Car, Home, Route as RouteIcon, Store, Waves } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  HOT_TOPICS,
  type HotTopic,
  type HotTopicIconName,
  type HotTopicLink,
} from "@/config/hot-topics";
import type { Assembly } from "@/features/assemblies/shared/types";
import { routes } from "@/lib/routes";

const ICON_MAP: Record<HotTopicIconName, typeof Car> = {
  Car,
  Route: RouteIcon,
  Store,
  Home,
  Waves,
};

interface HotTopicsSectionProps {
  /** assemblyId → 定例会名の解決、および「最新の言及」バッジの算出に使う */
  assemblies: Assembly[];
}

function linkHref(link: HotTopicLink) {
  return link.type === "agenda-item"
    ? (routes.agendaItemDetail(link.assemblyId, link.id) as Route)
    : (routes.generalQuestionDetail(link.assemblyId, link.id) as Route);
}

/** topic.links の中で最も開催日が新しい定例会を返す（assembliesに存在しないIDは無視） */
function findLatestAssembly(
  topic: HotTopic,
  assemblyMap: Map<string, Assembly>
): Assembly | null {
  let latest: Assembly | null = null;
  for (const link of topic.links) {
    const assembly = assemblyMap.get(link.assemblyId);
    if (!assembly) continue;
    if (!latest || assembly.start_date > latest.start_date) {
      latest = assembly;
    }
  }
  return latest;
}

function HotTopicCard({
  topic,
  latestAssembly,
}: {
  topic: HotTopic;
  latestAssembly: Assembly | null;
}) {
  const Icon = ICON_MAP[topic.icon];
  const [primaryLink, ...restLinks] = topic.links;

  return (
    <div className="flex w-[240px] shrink-0 snap-start flex-col gap-3 rounded-xl border border-mirai-border-light bg-white p-6">
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-hirokawa-indigo/10">
        <Icon className="h-5 w-5 text-hirokawa-indigo" strokeWidth={1.75} />
      </div>
      <h3 className="text-lg font-bold text-black">{topic.title}</h3>
      <p className="text-sm text-mirai-text-subtle">{topic.description}</p>

      <div className="flex flex-wrap items-center gap-2">
        <p className="text-xs font-medium text-muted-foreground">
          議会での質問{topic.links.length}件
        </p>
        {latestAssembly && (
          <Badge variant="muted" className="text-[11px]">
            最新: {latestAssembly.name}
          </Badge>
        )}
      </div>

      {primaryLink && (
        <Link
          href={linkHref(primaryLink)}
          className="text-sm font-bold text-hirokawa-indigo underline-offset-2 hover:underline"
        >
          詳しく見る →
        </Link>
      )}

      {restLinks.length > 0 && (
        <div className="flex flex-col gap-1 border-t border-mirai-border-light pt-3">
          {restLinks.map((link) => (
            <Link
              key={link.id}
              href={linkHref(link)}
              className="line-clamp-1 text-xs text-mirai-text-subtle hover:underline"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function HotTopicsSection({ assemblies }: HotTopicsSectionProps) {
  if (HOT_TOPICS.length === 0) {
    return null;
  }

  const assemblyMap = new Map(assemblies.map((a) => [a.id, a]));

  return (
    <section className="rounded-3xl border border-hirokawa-indigo/10 bg-hirokawa-indigo/[0.04] p-6 md:p-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold text-hirokawa-indigo">
            今、広川町で話されていること
          </h2>
          <p className="text-sm font-medium text-mirai-text-subtle">
            議会でくり返し話題になっているテーマをまとめました
          </p>
        </div>
        {/* 右端は画面いっぱいまで広げる（Container の右paddingを相殺しつつ末尾カードの余白を確保）。 */}
        <div className="-mr-4 flex snap-x snap-mandatory gap-4 overflow-x-auto pr-4 pb-2 scrollbar-hide sm:-mr-6 sm:pr-6 lg:-mr-8 lg:pr-8">
          {HOT_TOPICS.map((topic) => (
            <HotTopicCard
              key={topic.id}
              topic={topic}
              latestAssembly={findLatestAssembly(topic, assemblyMap)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
