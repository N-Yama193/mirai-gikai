"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { isInterviewSection, isMainPage } from "@/lib/page-layout-utils";
import { cn } from "@/lib/utils";

interface MainLayoutProps {
  /**
   * CHAT_ENABLED の値。Server Component 側で判定して渡す。
   * チャットサイドバー用の右オフセットを出すかどうかの判定に使う。
   */
  chatEnabled: boolean;
  children: ReactNode;
}

export function MainLayout({ chatEnabled, children }: MainLayoutProps) {
  const pathname = usePathname();
  // チャットが無効なときにオフセットを付けると、描画されないサイドバーのために
  // 右側に500pxの空白が残ってしまうため、チャットが有効なときだけ適用する
  const useSidebarLayout = isMainPage(pathname) && chatEnabled;
  const isInterview = isInterviewSection(pathname);

  return (
    <div
      className={cn(
        // モバイルは余白なし（ヒーロー/サムネイルを画面最上部に表示）、md以上で固定
        // ヘッダー分の上余白を確保する。パンくずを持つページは各ページ側で
        // モバイル時の上余白（pt-24 md:pt-0）を付与してヘッダー埋もれを回避する。
        "relative max-w-[700px] mx-auto md:mt-24",
        // インタビューページ以外ではshadowを表示
        !isInterview && "sm:shadow-lg",
        // TOPページと法案詳細ページのみ、チャットサイドバー用のオフセット
        useSidebarLayout && "pc:mr-[500px] xl:ml-[calc(calc(100vw-1180px)/2)]"
      )}
    >
      {children}
    </div>
  );
}
