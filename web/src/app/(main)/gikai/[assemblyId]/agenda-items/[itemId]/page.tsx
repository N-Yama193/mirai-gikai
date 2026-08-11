import { ChevronRight } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layouts/container";
import { routes } from "@/lib/routes";
import { getAssemblyById } from "@/features/assemblies/server/loaders/get-assembly-by-id";
import { getAgendaItemById } from "@/features/agenda-items/server/loaders/get-agenda-item-by-id";
import { AgendaItemDetail } from "@/features/agenda-items/server/components/agenda-item-detail";

type Props = {
  params: Promise<{ assemblyId: string; itemId: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { itemId } = await params;
  const item = await getAgendaItemById(itemId);

  if (!item) {
    return { title: "議案が見つかりません" };
  }

  return {
    title: `${item.title} | みらい議会`,
    description: `議案「${item.title}」（${item.item_number}）の内容です。`,
  };
}

export default async function AgendaItemDetailPage({ params }: Props) {
  const { assemblyId, itemId } = await params;

  const [assembly, item] = await Promise.all([
    getAssemblyById(assemblyId),
    getAgendaItemById(itemId),
  ]);

  if (!assembly || !item || item.assembly_id !== assembly.id) {
    notFound();
  }

  return (
    <div className="bg-mirai-surface-muted">
      <Container className="py-8">
        <AgendaItemDetail item={item} />
      </Container>

      <Container className="py-8">
        <nav className="flex items-center gap-2 text-[15px] flex-wrap">
          <Link href={routes.home()} className="text-black">
            TOP
          </Link>
          <ChevronRight className="h-5 w-5 text-black" />
          <Link href={routes.assemblyList()} className="text-black">
            定例会一覧
          </Link>
          <ChevronRight className="h-5 w-5 text-black" />
          <Link
            href={routes.agendaItemList(assembly.id) as Route}
            className="text-black"
          >
            {assembly.name}
          </Link>
          <ChevronRight className="h-5 w-5 text-black" />
          <span className="text-black">{item.title}</span>
        </nav>
      </Container>
    </div>
  );
}
