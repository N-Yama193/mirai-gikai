import type { MetadataRoute } from "next";
import { getAgendaItemsByAssembly } from "@/features/agenda-items/server/loaders/get-agenda-items-by-assembly";
import { getAssemblies } from "@/features/assemblies/server/loaders/get-assemblies";
import { getBills } from "@/features/bills/server/loaders/get-bills";
import { getGeneralQuestionsByAssembly } from "@/features/general-questions/server/loaders/get-general-questions-by-assembly";
import { env } from "@/lib/env";
import { routes } from "@/lib/routes";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // metadataBase (layout.tsx) と同じ正式ドメインを使う。VERCEL_URL はプレビュー
  // デプロイごとに変わるランダムなドメインのため、サイトマップには使わない。
  const baseUrl = env.webUrl;

  const [bills, assemblies] = await Promise.all([getBills(), getAssemblies()]);

  const billUrls: MetadataRoute.Sitemap = bills.map((bill) => ({
    url: `${baseUrl}${routes.billDetail(bill.id)}`,
    lastModified: new Date(bill.updated_at),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // 定例会ごとに議案一覧・議案詳細・一般質問一覧・一般質問詳細のURLを組み立てる
  const assemblyEntries = await Promise.all(
    assemblies.map(async (assembly): Promise<MetadataRoute.Sitemap> => {
      const [agendaItems, generalQuestions] = await Promise.all([
        getAgendaItemsByAssembly(assembly.id),
        getGeneralQuestionsByAssembly(assembly.id),
      ]);

      // 一覧ページ自体には更新日時がないため、定例会レコードの更新日時で代用する
      const assemblyLastModified = new Date(assembly.updated_at);

      const agendaItemUrls: MetadataRoute.Sitemap = agendaItems.map((item) => ({
        url: `${baseUrl}${routes.agendaItemDetail(assembly.id, item.id)}`,
        lastModified: new Date(item.updated_at),
        changeFrequency: "monthly",
        priority: 0.6,
      }));

      const generalQuestionUrls: MetadataRoute.Sitemap = generalQuestions.map(
        (question) => ({
          url: `${baseUrl}${routes.generalQuestionDetail(assembly.id, question.id)}`,
          lastModified: new Date(question.updated_at),
          changeFrequency: "monthly",
          priority: 0.6,
        })
      );

      return [
        {
          url: `${baseUrl}${routes.agendaItemList(assembly.id)}`,
          lastModified: assemblyLastModified,
          changeFrequency: "weekly",
          priority: 0.7,
        },
        ...agendaItemUrls,
        {
          url: `${baseUrl}${routes.generalQuestionList(assembly.id)}`,
          lastModified: assemblyLastModified,
          changeFrequency: "weekly",
          priority: 0.7,
        },
        ...generalQuestionUrls,
      ];
    })
  );

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...assemblyEntries.flat(),
    ...billUrls,
  ];
}
