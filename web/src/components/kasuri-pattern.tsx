/**
 * 久留米絣の織り目を抽象化した背景パターン。
 *
 * 設計方針（docs/Phase4_トップページ広川町化_設計仕様.md 5-2）:
 * - 唐草模様のような装飾的な和柄にはしない
 * - 絣の織り目を極細の不規則な線として抽象化し、控えめに使う
 * - 「一見すると現代的なデータサイトだが、よく見ると絣になっている」体験を狙う
 *
 * 濃淡について:
 *   全ての線を同じ濃さで描くと単なる網目に見えてしまうため、
 *   濃・中・淡の3層に分けている。藍染めの反物が、染まりの強い糸と
 *   淡い糸が重なって奥行きを持って見えるのと同じ効果を狙っている。
 *
 * 実装上の注意:
 * - 「不規則さ」に Math.random() は使わない。SSRとクライアントで異なる値になり
 *   ハイドレーション不一致を起こすため、下の固定配列で揺らぎを表現している。
 * - 面の表現のみを担当する。区切り線やカード境界のような「線」は
 *   globals.css の .kasuri-divider / .kasuri-edge を使うこと（DOM要素を増やさないため）。
 */

/** 織り目の層。手前に見える濃い糸から、奥に沈む淡い糸まで */
type ThreadLayer = {
  /** 基準不透明度に対する倍率 */
  opacityScale: number;
  strokeWidth: number;
  /** 縦糸 [x座標, 線の長さ, 開始位置] */
  warp: [number, number, number][];
  /** 横糸 [y座標, 線の長さ, 開始位置] */
  weft: [number, number, number][];
};

const THREAD_LAYERS: ThreadLayer[] = [
  // 濃い層（手前の織り目）
  {
    opacityScale: 1.4,
    strokeWidth: 1.6,
    warp: [
      [12, 13, 14],
      [28, 14, 2],
      [52, 12, 1],
    ],
    weft: [[18, 13, 6]],
  },
  // 中間層
  {
    opacityScale: 0.93,
    strokeWidth: 1.2,
    warp: [
      [4, 11, 0],
      [20, 9, 8],
      [36, 11, 12],
      [44, 7, 14],
    ],
    weft: [
      [38, 8, 4],
      [48, 11, 9],
    ],
  },
  // 淡い層（奥に沈む織り目）
  {
    opacityScale: 0.53,
    strokeWidth: 0.95,
    warp: [
      [4, 6, 15],
      [12, 7, 3],
      [20, 5, 0],
      [20, 4, 21],
      [28, 6, 19],
      [36, 8, 0],
      [44, 5, 5],
      [44, 3, 24],
      [52, 8, 16],
    ],
    weft: [
      [8, 9, 2],
      [8, 5, 16],
      [26, 6, 0],
      [26, 10, 11],
      [38, 5, 18],
    ],
  },
];

const TILE_SIZE = 56;

/**
 * タイル内で織り目を縦方向中央に寄せるためのオフセット。
 *
 * 縦糸（WARP）は y=0〜27 に収まっており、56px のタイルに対して
 * 上端0px・下端29pxと上に寄っていた。その結果、縦糸と横糸が交差する
 * 「+」の形もタイル上半分（y=8,18,26）だけに現れ、下半分（y=38,48）には
 * 交点が無く、上下のバランスが崩れて見えていた。
 *
 * (TILE_SIZE - 縦糸の高さ) / 2 = (56 - 27) / 2 = 14.5 だけ下げると
 * 上端・下端とも 14.5px となり均等になる。
 * 内容ではなくタイリング自体をずらす（patternTransform）ことで、
 * タイル境界での見切れを起こさずに全体を移動できる。
 */
const PATTERN_Y_OFFSET = 14.5;

interface KasuriPatternProps {
  /** パターンのID。同一ページに複数置く場合は衝突しないよう変える */
  id?: string;
  /** 濃い層の不透明度。中間層・淡い層はこれを基準に按分される */
  opacity?: number;
  className?: string;
}

export function KasuriPattern({
  id = "kasuri",
  opacity = 0.27,
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
          patternTransform={`translate(0, ${PATTERN_Y_OFFSET})`}
        >
          {THREAD_LAYERS.map((layer) => (
            <g
              key={layer.strokeWidth}
              stroke="currentColor"
              strokeWidth={layer.strokeWidth}
              strokeLinecap="butt"
              opacity={opacity * layer.opacityScale}
            >
              {layer.warp.map(([x, length, start]) => (
                <line
                  key={`warp-${x}-${start}`}
                  x1={x}
                  y1={start}
                  x2={x}
                  y2={start + length}
                />
              ))}
              {layer.weft.map(([y, length, start]) => (
                <line
                  key={`weft-${y}-${start}`}
                  x1={start}
                  y1={y}
                  x2={start + length}
                  y2={y}
                />
              ))}
            </g>
          ))}
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
