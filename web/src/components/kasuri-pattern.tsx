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
 * 上下のバランスについて:
 *   SVGの <pattern> で左上を起点にタイリングすると、コンテナ高さが
 *   タイルサイズの倍数でない限り最下段が途中で切れ、上下の余白が食い違う
 *   （高さ360pxのとき 上22.5px / 下1.5px と21pxもズレていた）。
 *   そのため CSS の背景として敷き、background-position: center で
 *   タイル格子をコンテナ中心に対して対称に配置している。
 *   これでコンテナ高さに関わらず上下の余白が揃う。
 *
 * 実装上の注意:
 * - 「不規則さ」に Math.random() は使わない。SSRとクライアントで異なる値になり
 *   ハイドレーション不一致を起こすため、下の固定配列で揺らぎを表現している。
 * - 面の表現のみを担当する。区切り線やカード境界のような「線」は
 *   globals.css の .kasuri-divider / .kasuri-edge を使うこと（DOM要素を増やさないため）。
 */

const TILE_SIZE = 56;

/**
 * 織り目の層。手前に見える濃い糸から、奥に沈む淡い糸まで。
 *
 * 座標はタイル内のローカル値。縦糸と横糸が交差してできる「+」の帯が
 * タイル中心（y=28）に対して対称になるよう、y=19 / 28 / 37 に配置している。
 * これが崩れると、上記 background-position: center による上下対称も崩れる。
 */
type ThreadLayer = {
  /** 基準不透明度に対する倍率 */
  opacityScale: number;
  strokeWidth: number;
  /** 縦糸 [x座標, 線の長さ, 開始y] */
  warp: [number, number, number][];
  /** 横糸 [y座標, 線の長さ, 開始x] */
  weft: [number, number, number][];
};

const THREAD_LAYERS: ThreadLayer[] = [
  // 濃い層（手前の織り目）
  {
    opacityScale: 1.4,
    strokeWidth: 1.6,
    warp: [
      [12, 13, 25],
      [28, 14, 13],
      [52, 12, 12],
    ],
    weft: [[28, 13, 6]],
  },
  // 中間層
  {
    opacityScale: 0.93,
    strokeWidth: 1.2,
    warp: [
      [4, 11, 11],
      [20, 9, 19],
      [36, 11, 23],
      [44, 7, 25],
    ],
    weft: [
      [49, 8, 4],
      [3, 11, 9],
    ],
  },
  // 淡い層（奥に沈む織り目）
  {
    opacityScale: 0.53,
    strokeWidth: 0.95,
    warp: [
      [4, 6, 26],
      [12, 7, 14],
      [20, 5, 11],
      [20, 4, 32],
      [28, 6, 30],
      [36, 8, 11],
      [44, 5, 16],
      [44, 3, 35],
      [52, 8, 27],
    ],
    weft: [
      [19, 9, 2],
      [19, 5, 16],
      [37, 6, 0],
      [37, 10, 11],
      [49, 5, 18],
    ],
  },
];

/** 1タイルぶんのSVGを組み立てる（CSSのbackground-imageに埋め込むため文字列で返す） */
function buildTileSvg(color: string, opacity: number): string {
  const groups = THREAD_LAYERS.map((layer) => {
    const lines = [
      ...layer.warp.map(
        ([x, length, start]) =>
          `<line x1="${x}" y1="${start}" x2="${x}" y2="${start + length}"/>`
      ),
      ...layer.weft.map(
        ([y, length, start]) =>
          `<line x1="${start}" y1="${y}" x2="${start + length}" y2="${y}"/>`
      ),
    ].join("");
    return `<g stroke="${color}" stroke-width="${layer.strokeWidth}" stroke-linecap="butt" opacity="${(opacity * layer.opacityScale).toFixed(3)}">${lines}</g>`;
  }).join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${TILE_SIZE}" height="${TILE_SIZE}" viewBox="0 0 ${TILE_SIZE} ${TILE_SIZE}">${groups}</svg>`;
}

interface KasuriPatternProps {
  /**
   * 糸の色。CSSのbackground-imageに埋め込む都合で currentColor は使えないため、
   * 呼び出し側から具体的な色を渡す。既定は藍地に映える絣白。
   */
  color?: string;
  /** 濃い層の不透明度。中間層・淡い層はこれを基準に按分される */
  opacity?: number;
  className?: string;
}

export function KasuriPattern({
  color = "#f8f7f2",
  opacity = 0.27,
  className,
}: KasuriPatternProps) {
  const tile = encodeURIComponent(buildTileSvg(color, opacity));

  return (
    <div
      className={className}
      aria-hidden="true"
      style={{
        backgroundImage: `url("data:image/svg+xml,${tile}")`,
        backgroundRepeat: "repeat",
        // タイル格子をコンテナ中心に対して対称に置き、上下の余白を揃える
        backgroundPosition: "center",
        backgroundSize: `${TILE_SIZE}px ${TILE_SIZE}px`,
      }}
    />
  );
}
