import { ImageResponse } from "next/og";

/**
 * iOS のホーム画面用アイコン。icon.tsx と同じ意匠を大きいサイズで生成する。
 */
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        background: "#174a68",
      }}
    >
      <div style={{ width: 16, height: 68, background: "#f8f7f2" }} />
      <div style={{ width: 16, height: 112, background: "#f8f7f2" }} />
      <div style={{ width: 16, height: 80, background: "#f8f7f2" }} />
    </div>,
    size
  );
}
