import { Container } from "@/components/layouts/container";
import { KasuriPattern } from "@/components/kasuri-pattern";
import { SITE_NAME } from "@/config/site";

/**
 * 広川町議会版のHero。
 *
 * FORK_GUIDELINES.md に沿い、本家（チームみらい）のロゴ・ヒーロー画像は使わない。
 * 画像素材を持ち込まず、サービス名のテキストと絣パターンだけで構成している。
 *
 * 配色の考え方:
 *   久留米絣は「藍地に白い絣糸」なので、深い紺をベースに白い織り目を乗せる。
 *   淡い水色（浅葱・空）は背景ではなく、文字色と光の陰影に使う。
 */
export function HirokawaHero() {
  return (
    <div className="relative overflow-hidden bg-hirokawa-indigo">
      {/* 藍のベース。上を広川藍、下へ向かって絣藍まで深く沈める */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(165deg, var(--color-hirokawa-blue) 0%, #143f59 52%, var(--color-hirokawa-indigo) 100%)",
        }}
      />
      {/*
        布に当たる光の陰影。
        テキストは左寄せなので、あえて逆側の右上に置いて重ならないようにしている
        （重なるとコントラスト比が AAA を下回るため。詳細は下のテキスト色のコメント）。
      */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(100% 72% at 84% -6%, rgba(169, 198, 216, 0.12) 0%, rgba(169, 198, 216, 0) 60%)",
        }}
      />

      {/* 絣の織り目。藍地に対して白い糸として乗せる */}
      <KasuriPattern className="pointer-events-none absolute inset-0" />

      <Container className="relative py-16 md:py-24">
        {/*
          文字色は藍地に対する明色。最も明るい背景（光の陰影が乗った広川藍）でも
          WCAG AAA を満たす組み合わせを選んでいる。
        */}
        <p className="text-sm font-bold text-hirokawa-sora">
          広川町議会 会議録アーカイブ
        </p>

        <h1 className="mt-3 text-3xl font-bold leading-[1.35] text-kasuri-white md:text-4xl">
          {SITE_NAME}
        </h1>

        <p className="mt-5 max-w-xl text-base leading-relaxed text-hirokawa-sora md:text-lg">
          広川町議会でいま何が議論されているのかを、
          <br className="hidden sm:block" />
          わかりやすく伝えます。
        </p>
      </Container>
    </div>
  );
}
