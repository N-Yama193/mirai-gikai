import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Lexend_Giga, Noto_Sans_JP, Noto_Serif_JP } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import type { ReactNode } from "react";
import { SITE_DESCRIPTION, SITE_NAME } from "@/config/site";
import { env } from "@/lib/env";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const lexendGiga = Lexend_Giga({
  variable: "--font-lexend-giga",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800", "900"],
});

// トピックの代表意見など、引用文を明朝体で表示するために使用
const notoSerifJP = Noto_Serif_JP({
  variable: "--font-noto-serif-jp",
  subsets: ["latin"],
  weight: ["500", "600"],
});

const siteTitle = SITE_NAME;
const siteDescription = SITE_DESCRIPTION;
const siteName = SITE_NAME;

// favicon / apple-icon / OGP画像は本家の画像素材を使わず、
// app/icon.tsx・app/apple-icon.tsx・app/opengraph-image.tsx で
// next/og により動的生成している（Next.jsのファイル規約で自動的に適用される）。
export const metadata: Metadata = {
  metadataBase: new URL(env.webUrl),
  title: siteTitle,
  description: siteDescription,
  keywords: [
    siteName,
    "広川町",
    "広川町議会",
    "議会",
    "定例会",
    "議案",
    "一般質問",
    "会議録",
  ],
  manifest: "/manifest.json",
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    siteName,
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "n_NHxAk5g-eRe9bqYecnGceVhf_5q2vRtFhZG9gU48M",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#174a68",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${notoSansJP.variable} ${lexendGiga.variable} ${notoSerifJP.variable} font-sans antialiased bg-mirai-surface-light`}
      >
        <NextTopLoader showSpinner={false} color="#174a68" />
        {children}
      </body>
    </html>
  );
}
