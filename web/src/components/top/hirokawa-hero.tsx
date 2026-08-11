import { Container } from "@/components/layouts/container";
import { KasuriPattern } from "@/components/kasuri-pattern";
import { SITE_NAME } from "@/config/site";

/**
 * 広川町議会版のHero。
 *
 * FORK_GUIDELINES.md に沿い、本家（チームみらい）のロゴ・ヒーロー画像は使わない。
 * 画像素材を持ち込まず、サービス名のテキストと絣パターンだけで構成している。
 */
export function HirokawaHero() {
  return (
    <div className="relative overflow-hidden bg-mirai-surface">
      {/* 絣の織り目。装飾なので currentColor 経由で藍色を薄く乗せる */}
      <div
        className="pointer-events-none absolute inset-0 text-hirokawa-blue"
        aria-hidden="true"
      >
        <KasuriPattern id="hero-kasuri" />
      </div>

      <Container className="relative py-16 md:py-24">
        <p className="text-sm font-bold text-primary-accent">
          広川町議会 会議録アーカイブ
        </p>

        <h1 className="mt-3 text-3xl font-bold leading-[1.35] text-hirokawa-indigo md:text-4xl">
          {SITE_NAME}
        </h1>

        <p className="mt-5 max-w-xl text-base leading-relaxed text-mirai-text md:text-lg">
          広川町議会でいま何が議論されているのかを、
          <br className="hidden sm:block" />
          わかりやすく伝えます。
        </p>

        <hr className="kasuri-divider mt-8 max-w-xs" />
      </Container>
    </div>
  );
}
