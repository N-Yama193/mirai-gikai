import { Car, Home, Route as RouteIcon, Store, Waves } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";
import {
  HOT_TOPICS,
  type HotTopic,
  type HotTopicIconName,
  type HotTopicLink,
} from "@/config/hot-topics";
import { routes } from "@/lib/routes";

const ICON_MAP: Record<HotTopicIconName, typeof Car> = {
  Car,
  Route: RouteIcon,
  Store,
  Home,
  Waves,
};

function linkHref(link: HotTopicLink) {
  return link.type === "agenda-item"
    ? (routes.agendaItemDetail(link.assemblyId, link.id) as Route)
    : (routes.generalQuestionDetail(link.assemblyId, link.id) as Route);
}

function HotTopicCard({ topic }: { topic: HotTopic }) {
  const Icon = ICON_MAP[topic.icon];
  const [primaryLink, ...restLinks] = topic.links;

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-mirai-border-light bg-white p-5">
      <Icon className="h-6 w-6 text-hirokawa-indigo" strokeWidth={1.75} />
      <h3 className="text-base font-bold text-black">{topic.title}</h3>
      <p className="text-sm text-mirai-text-subtle">{topic.description}</p>
      <p className="text-xs font-medium text-muted-foreground">
        議会での質問{topic.links.length}件
      </p>

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

export function HotTopicsSection() {
  if (HOT_TOPICS.length === 0) {
    return null;
  }

  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-bold text-hirokawa-indigo">
          今、広川町で話されていること
        </h2>
        <p className="text-xs font-medium text-mirai-text-subtle">
          これまでの一般質問・議案から、いま関心が高いテーマを集めました
        </p>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
        {HOT_TOPICS.map((topic) => (
          <HotTopicCard key={topic.id} topic={topic} />
        ))}
      </div>
    </section>
  );
}
