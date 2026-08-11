/**
 * 久留米絣の織り目を抽象化した背景パターン。
 *
 * 設計方針（docs/Phase4_トップページ広川町化_設計仕様.md 5-2）:
 * - 唐草模様のような装飾的な和柄にはしない
 * - 絣の織り目を極細の不規則な線として抽象化し、控えめに使う
 * - 「一見すると現代的なデータサイトだが、よく見ると絣になっている」体験を狙う
 *
 * 実装上の注意:
 * - 「不規則さ」に Math.random() は使わない。SSRとクライアントで異なる値になり
 *   ハイドレーション不一致を起こすため、下の固定配列で揺らぎを表現している。
 * - 面の表現のみを担当する。区切り線やカード境界のような「線」は
 *   globals.css の .kasuri-divider / .kasuri-edge を使うこと（DOM要素を増やさないため）。
 */

/** 絣の縦糸。[x座標, 線の長さ, 開始位置] を1タイルぶん並べたもの */
const WARP_THREADS: [number, number, number][] = [
  [4, 11, 0],
  [4, 6, 15],
  [12, 7, 3],
  [12, 13, 14],
  [20, 5, 0],
  [20, 9, 8],
  [20, 4, 21],
  [28, 14, 2],
  [28, 6, 19],
  [36, 8, 0],
  [36, 11, 12],
  [44, 5, 5],
  [44, 7, 14],
  [44, 3, 24],
  [52, 12, 1],
  [52, 8, 16],
];

/** 絣の横糸。[y座標, 線の長さ, 開始位置] */
const WEFT_THREADS: [number, number, number][] = [
  [8, 9, 2],
  [8, 5, 16],
  [18, 13, 6],
  [26, 6, 0],
  [26, 10, 11],
  [38, 8, 4],
  [38, 5, 18],
  [48, 11, 9],
];

const TILE_SIZE = 56;

interface KasuriPatternProps {
  /** パターンのID。同一ページに複数置く場合は衝突しないよう変える */
  id?: string;
  /** 線の不透明度。既定は控えめの 0.14 */
  opacity?: number;
  className?: string;
}

export function KasuriPattern({
  id = "kasuri",
  opacity = 0.14,
  className,
}: KasuriPatternProps) {
  return (
    <svg
      className={className}
      width="100%"
      height="100%"
      aria-hidden="true"
      focusable="false"
    >
      <title>絣模様の装飾</title>
      <defs>
        <pattern
          id={id}
          width={TILE_SIZE}
          height={TILE_SIZE}
          patternUnits="userSpaceOnUse"
        >
          <g
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="butt"
            opacity={opacity}
          >
            {WARP_THREADS.map(([x, length, start]) => (
              <line
                key={`warp-${x}-${start}`}
                x1={x}
                y1={start}
                x2={x}
                y2={start + length}
              />
            ))}
            {WEFT_THREADS.map(([y, length, start]) => (
              <line
                key={`weft-${y}-${start}`}
                x1={start}
                y1={y}
                x2={start + length}
                y2={y}
              />
            ))}
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
