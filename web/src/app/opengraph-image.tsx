import { ImageResponse } from "next/og";
import { SITE_DESCRIPTION, SITE_NAME } from "@/config/site";

/**
 * OGP画像を next/og で動的生成する。
 *
 * 本家の /ogp.jpg・/img/ogp-logo.png は使わない（FORK_GUIDELINES.md）。
 * Phase 4 の方針に沿って画像素材を持ち込まず、絣の織り目を模した
 * 縦のストロークとテキストだけで構成する。
 */
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = SITE_NAME;

/**
 * 絣の縦糸に見立てたストロークの高さ（規則的になりすぎないよう不揃いにする）。
 * key に配列インデックスを使わずに済むよう、値はすべて異なるものにしている。
 */
const STROKE_HEIGHTS = [
  120, 64, 180, 96, 148, 72, 200, 110, 60, 168, 88, 136, 76, 192, 104,
];

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#f8f7f2",
        padding: 80,
      }}
    >
      {/* 上部: 絣の織り目 */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
        {STROKE_HEIGHTS.map((height) => (
          <div
            key={`top-${height}`}
            style={{
              width: 6,
              height: height / 2,
              background: "#174a68",
              opacity: 0.35,
            }}
          />
        ))}
      </div>

      {/* 中央: サービス名 */}
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ fontSize: 30, color: "#5e8060", fontWeight: 700 }}>
          広川町議会 会議録アーカイブ
        </div>
        <div style={{ fontSize: 84, color: "#123b52", fontWeight: 700 }}>
          {SITE_NAME}
        </div>
        <div style={{ fontSize: 32, color: "#1f2937" }}>{SITE_DESCRIPTION}</div>
      </div>

      {/* 下部: 絣の織り目 */}
      <div style={{ display: "flex", alignItems: "flex-end", gap: 14 }}>
        {STROKE_HEIGHTS.map((height) => (
          <div
            key={`bottom-${height}`}
            style={{
              width: 6,
              height: height / 3,
              background: "#174a68",
              opacity: 0.25,
            }}
          />
        ))}
      </div>
    </div>,
    size
  );
}
