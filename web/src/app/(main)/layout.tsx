import { GoogleAnalytics } from "@next/third-parties/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { ReactNode } from "react";
import { Header } from "@/components/header";
import { AuthGate } from "@/components/layouts/auth-gate";
import { Footer } from "@/components/layouts/footer/footer";
import { MainContentArea } from "@/components/layouts/main-content-area";
import { MainLayout } from "@/components/layouts/main-layout";
import { env } from "@/lib/env";
import { RubyfulInitializer } from "@/lib/rubyful";

export default function MainGroupLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      <SpeedInsights />
      <GoogleAnalytics gaId={env.analytics.gaTrackingId ?? ""} />
      <RubyfulInitializer />
      <AuthGate />

      <MainLayout chatEnabled={env.chat.enabled}>
        <Header />
        <MainContentArea>{children}</MainContentArea>
        <Footer />
      </MainLayout>
    </>
  );
}
