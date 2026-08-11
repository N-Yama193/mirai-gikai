import { FORK_DISCLAIMER, SITE_NAME, UPSTREAM_SITE_URL } from "@/config/site";

/**
 * トップページの「このサイトについて」セクション。
 * FORK_GUIDELINES.md が必須とする免責文言と、本家への言及をここで表示する。
 */
export function AboutThisSite() {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xl font-bold text-hirokawa-indigo">
        このサイトについて
      </h2>

      <p className="text-sm leading-relaxed text-mirai-text">
        {SITE_NAME}
        は、広川町議会の会議録をもとに、定例会で審議された議案や議員の一般質問を整理して公開しているサイトです。
        掲載内容は公開されている会議録を基に、AIを活用しながら要約・整理したものです。
      </p>

      <div className="rounded-lg border border-mirai-border bg-mirai-surface-grouped p-4">
        <p className="text-sm font-bold text-mirai-text">{FORK_DISCLAIMER}</p>
        <p className="mt-2 text-sm leading-relaxed text-mirai-text">
          本サイトは、チームみらいが開発した{" "}
          <a
            href={UPSTREAM_SITE_URL}
            target="_blank"
            rel="noreferrer"
            className="text-primary-accent underline"
          >
            みらい議会
          </a>{" "}
          をベースに、広川町議会向けに作り変えたものです。
        </p>
      </div>

      <p className="text-xs leading-relaxed text-mirai-text-subtle">
        掲載情報は可能な限り正確を期していますが、その正確性・完全性を保証するものではありません。
        正確な内容は広川町議会が公開する会議録の原本をご確認ください。
      </p>
    </section>
  );
}
