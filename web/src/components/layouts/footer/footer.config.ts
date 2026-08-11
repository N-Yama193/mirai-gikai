import { UPSTREAM_SITE_URL } from "@/config/site";
import { EXTERNAL_LINKS } from "@/config/external-links";
import { routes } from "@/lib/routes";

export type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type FooterPolicyLink = {
  label: string;
  href: string;
  external?: boolean;
};

// NOTE: 本家（チームみらい）の寄附ページへのリンクは掲載しない。
// 本フォークの利用者が、運営主体の異なる本家へ誤って寄附してしまうため。
// 本家への言及は FooterUpstreamNote（footer.tsx）のリンクに集約している。
export const primaryLinks: FooterLink[] = [
  {
    label: "TOP",
    href: routes.home(),
  },
  {
    label: "みらい議会（本家）",
    href: UPSTREAM_SITE_URL,
    external: true,
  },
];

export const policyLinks: FooterPolicyLink[] = [
  {
    label: "利用規約",
    href: routes.terms(),
  },
  {
    label: "プライバシーポリシー",
    href: routes.privacy(),
  },
  {
    label: "開発者向け",
    href: routes.developers(),
  },
  {
    label: "ソースコード",
    href: EXTERNAL_LINKS.GITHUB_REPO,
    external: true,
  },
];
