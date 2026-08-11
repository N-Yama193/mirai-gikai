import { ImageResponse } from "next/og";

/**
 * favicon を next/og で動的生成する。
 *
 * FORK_GUIDELINES.md は本家のfaviconをそのまま使わないことを求めているが、
 * Phase 4 の方針は「画像素材を持ち込まない」ため、コードから生成している。
 * 絣の織り目を想起させる縦のストロークと頭文字で構成する。
 */
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        background: "#174a68",
        borderRadius: 6,
      }}
    >
      {/* 絣の縦糸に見立てた3本のストローク（中央を長く） */}
      <div style={{ width: 3, height: 12, background: "#f8f7f2" }} />
      <div style={{ width: 3, height: 20, background: "#f8f7f2" }} />
      <div style={{ width: 3, height: 14, background: "#f8f7f2" }} />
    </div>,
    size
  );
}
