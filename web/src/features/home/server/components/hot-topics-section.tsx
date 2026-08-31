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
    <div className="flex w-[240px] shrink-0 snap-start flex-col gap-3 rounded-xl border border-mirai-border-light bg-white p-6 md:w-auto">
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
    // ページ全体がMainLayout(max-w-[700px] mx-auto)+Container(max-w-4xl mx-auto
    // px-4等)の二重の幅制限に収まる1カラムレイアウトのため、通常の子要素は最大
    // 700px幅にしかならない。このセクションだけはPCで目立たせたいので、
    // margin-left:50% + translate-x(-50%) の定番のコンテナ breakout テクニックで
    // 祖先の幅制限をすべて突き抜け、ビューポート中央に再センタリングする。
    // 幅はclamp(700px, 50vw, 896px) とし、mdブレークポイント直後の狭い画面では
    // 元の700px（グリッドが窮屈にならない下限）を保ち、画面が広がるほど
    // 画面幅の50%相当まで広がり、896px（Containerのmax-w-4xlと同じ値）で頭打ちにする。
    // モバイル(md未満)はbreakout用のクラスを一切付けないため、これまでと表示は変わらない。
    <section className="rounded-3xl border border-hirokawa-indigo/10 bg-hirokawa-indigo/[0.04] p-6 md:ml-[50%] md:w-[clamp(700px,50vw,896px)] md:-translate-x-1/2 md:p-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold text-hirokawa-indigo">
            今、広川町で話されていること
          </h2>
          <p className="text-sm font-medium text-mirai-text-subtle">
            議会でくり返し話題になっているテーマをまとめました
          </p>
        </div>
        {/*
          モバイル(md未満)は横スクロールカルーセル。右端は画面いっぱいまで広げる
          （Container の右paddingを相殺しつつ末尾カードの余白を確保）。
          md以上ではgrid-cols-2に切り替える。このサイト全体がmax-w-[700px]の
          細い1カラムレイアウト（main-layout.tsx）のため、3列以上にすると
          カード幅が100〜130px程度まで狭くなり、タイトルが1〜2文字ずつ折り返す
          窮屈な見た目になる。2列だと実測で278×280〜360px程度になり、
          正方形に近いバランスの良いカードになる。
        */}
        <div className="-mr-4 flex snap-x snap-mandatory gap-4 overflow-x-auto pr-4 pb-2 scrollbar-hide sm:-mr-6 sm:pr-6 md:mr-0 md:grid md:grid-cols-2 md:overflow-visible md:pb-0 md:pr-0">
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
