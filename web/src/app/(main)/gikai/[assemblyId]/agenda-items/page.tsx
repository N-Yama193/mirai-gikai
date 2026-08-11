import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layouts/container";
import { routes } from "@/lib/routes";
import { getAssemblyById } from "@/features/assemblies/server/loaders/get-assembly-by-id";
import { getAgendaItemsByAssembly } from "@/features/agenda-items/server/loaders/get-agenda-items-by-assembly";
import { AgendaItemList } from "@/features/agenda-items/server/components/agenda-item-list";

type Props = {
  params: Promise<{ assemblyId: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { assemblyId } = await params;
  const assembly = await getAssemblyById(assemblyId);

  if (!assembly) {
    return { title: "定例会が見つかりません" };
  }

  return {
    title: `${assembly.name}の議案一覧 | みらい議会`,
    description: `${assembly.name}（${assembly.start_date}〜${assembly.end_date}）に提出された議案の一覧です。`,
  };
}

export default async function AgendaItemsPage({ params }: Props) {
  const { assemblyId } = await params;
  const assembly = await getAssemblyById(assemblyId);

  if (!assembly) {
    notFound();
  }

  const items = await getAgendaItemsByAssembly(assembly.id);

  return (
    <div className="bg-mirai-surface-muted">
      <Container className="py-8">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-0.5">
            <h1 className="text-[22px] font-bold text-black leading-[1.48]">
              {assembly.name}の議案
            </h1>
            <p className="text-xs font-medium text-mirai-text">
              {items.length}件
            </p>
          </div>
          <AgendaItemList assemblyId={assembly.id} items={items} />
        </div>
      </Container>

      <Container className="py-8">
        <nav className="flex items-center gap-2 text-[15px]">
          <Link href={routes.home()} className="text-black">
            TOP
          </Link>
          <ChevronRight className="h-5 w-5 text-black" />
          <Link href={routes.assemblyList()} className="text-black">
            定例会一覧
          </Link>
          <ChevronRight className="h-5 w-5 text-black" />
          <span className="text-black">{assembly.name}</span>
        </nav>
      </Container>
    </div>
  );
}
