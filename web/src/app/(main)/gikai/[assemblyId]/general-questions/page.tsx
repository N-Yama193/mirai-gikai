import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layouts/container";
import { routes } from "@/lib/routes";
import { getAssemblyById } from "@/features/assemblies/server/loaders/get-assembly-by-id";
import { getGeneralQuestionsByAssembly } from "@/features/general-questions/server/loaders/get-general-questions-by-assembly";
import { GeneralQuestionList } from "@/features/general-questions/server/components/general-question-list";

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
    title: `${assembly.name}の一般質問一覧 | みらい議会`,
    description: `${assembly.name}（${assembly.start_date}〜${assembly.end_date}）で行われた一般質問の一覧です。`,
  };
}

export default async function GeneralQuestionsPage({ params }: Props) {
  const { assemblyId } = await params;
  const assembly = await getAssemblyById(assemblyId);

  if (!assembly) {
    notFound();
  }

  const questions = await getGeneralQuestionsByAssembly(assembly.id);

  return (
    <div className="bg-mirai-surface-muted">
      <Container className="py-8">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-0.5">
            <h1 className="text-[22px] font-bold text-black leading-[1.48]">
              {assembly.name}の一般質問
            </h1>
            <p className="text-xs font-medium text-mirai-text">
              {questions.length}件
            </p>
          </div>
          <GeneralQuestionList assemblyId={assembly.id} questions={questions} />
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
