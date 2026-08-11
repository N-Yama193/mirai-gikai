"use client";

import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FORK_DISCLAIMER, SITE_NAME, UPSTREAM_SITE_URL } from "@/config/site";
import { isInterviewPage } from "@/lib/page-layout-utils";
import { routes } from "@/lib/routes";
import { policyLinks, primaryLinks } from "./footer.config";

export function Footer() {
  const pathname = usePathname();

  if (isInterviewPage(pathname)) {
    return null;
  }

  return (
    <footer className="bg-mirai-gradient text-slate-900">
      <div className="mx-auto flex w-full max-w-[500px] flex-col items-center px-6 py-14 pb-20 text-center">
        <FooterLogoSection />
        <FooterPrimaryLinks />
        <FooterPolicies />
        <FooterUpstreamNote />
        <FooterCopyright />
      </div>
    </footer>
  );
}

function FooterLogoSection() {
  return (
    <div className="flex flex-col items-center text-center mb-9">
      <Link href={routes.home()} aria-label={`${SITE_NAME} トップページ`}>
        <span className="text-lg font-bold text-hirokawa-indigo">
          {SITE_NAME}
        </span>
      </Link>
      <hr className="kasuri-divider mt-3 w-32" />
    </div>
  );
}

/**
 * FORK_GUIDELINES.md が必須とする免責文言と、本家への言及。
 */
function FooterUpstreamNote() {
  return (
    <div className="mb-5 flex flex-col gap-1 text-center text-[12px] leading-relaxed text-slate-800">
      <p className="font-bold">{FORK_DISCLAIMER}</p>
      <p>
        本サイトは、チームみらいが開発した{" "}
        <a
          href={UPSTREAM_SITE_URL}
          target="_blank"
          rel="noreferrer"
          className="underline"
        >
          みらい議会
        </a>{" "}
        をベースにしています。
      </p>
    </div>
  );
}

function FooterPrimaryLinks() {
  return (
    <nav aria-label="主要リンク" className="w-full mb-5">
      <ul
        className="
      flex flex-col items-center gap-3 text-[14px] font-semibold text-slate-800
      md:flex-row md:justify-center md:gap-5
      "
      >
        {primaryLinks.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href as Route}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noreferrer" : undefined}
              className="transition-colors hover:text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function FooterPolicies() {
  return (
    <div className="flex flex-col items-center text-[12px] font-semibold text-slate-800 mb-5">
      <ul className="flex flex-wrap justify-center gap-x-2 gap-y-1">
        {policyLinks.map((policy, index) => (
          <li key={policy.label} className="flex items-center gap-2">
            <Link
              href={policy.href as Route}
              target={policy.external ? "_blank" : undefined}
              rel={policy.external ? "noreferrer" : undefined}
              className="transition-colors hover:text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
            >
              {policy.label}
            </Link>
            {index < policyLinks.length - 1 ? <span>｜</span> : null}
          </li>
        ))}
      </ul>
    </div>
  );
}

function FooterCopyright() {
  return (
    <div className="text-center text-sm font-medium text-slate-800">
      © 2026 {SITE_NAME}
    </div>
  );
}
