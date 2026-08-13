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
      {/*
        藍の濃淡。藍染めの反物が淡い水色から深い藍まで層になって見える表情を、
        2枚のグラデーションを重ねて再現する。
        1枚目は上から下へ抜ける縦のグラデーション、
        2枚目は左上から沈み込む藍のにじみ。
      */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(170deg, var(--color-hirokawa-asagi) 0%, var(--color-hirokawa-mizu) 30%, var(--color-hirokawa-sora) 58%, var(--color-kasuri-white) 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(120% 90% at 8% -10%, rgba(23, 74, 104, 0.28) 0%, rgba(23, 74, 104, 0) 62%)",
        }}
      />

      {/* 絣の織り目。装飾なので currentColor 経由で藍色を乗せる */}
      <div
        className="pointer-events-none absolute inset-0 text-hirokawa-blue"
        aria-hidden="true"
      >
        <KasuriPattern id="hero-kasuri" />
      </div>

      <Container className="relative py-16 md:py-24">
        {/* 小さい文字なので、藍がかった背景でもAAAを満たす最も濃い藍を使う */}
        <p className="text-sm font-bold text-hirokawa-sumi">
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
