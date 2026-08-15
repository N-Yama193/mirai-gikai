"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MainContentAreaProps {
  children: ReactNode;
}

/**
 * <main> のラッパー。
 *
 * TOPページはHeroの高さに対してフッターが浮かないよう、画面いっぱいの高さを
 * 確保する（min-h-dvh）。一方、議案詳細・一般質問詳細のような本文が短いページに
 * まで同じ最低高さを適用すると、本文直下からフッター手前まで間延びした空白が
 * 生じてしまうため、TOPページ以外はコンテンツの高さにそのまま従わせる。
 */
export function MainContentArea({ children }: MainContentAreaProps) {
  const pathname = usePathname();
  const isTopPage = pathname === "/";

  return (
    <main
      className={cn(
        "bg-mirai-surface",
        isTopPage && "min-h-dvh md:min-h-[calc(100dvh-96px)]"
      )}
    >
      {children}
    </main>
  );
}
