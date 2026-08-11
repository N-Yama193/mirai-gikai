import { ChevronRight } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layouts/container";
import { SITE_NAME } from "@/config/site";
import { routes } from "@/lib/routes";
import { getAssemblyById } from "@/features/assemblies/server/loaders/get-assembly-by-id";
import { getGeneralQuestionById } from "@/features/general-questions/server/loaders/get-general-question-by-id";
import { GeneralQuestionDetail } from "@/features/general-questions/server/components/general-question-detail";

type Props = {
  params: Promise<{ assemblyId: string; questionId: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { questionId } = await params;
  const question = await getGeneralQuestionById(questionId);

  if (!question) {
    return { title: "一般質問が見つかりません" };
  }

  return {
    title: `${question.title} | ${SITE_NAME}`,
    description: `${question.council_member.name}議員による一般質問「${question.title}」の内容です。`,
  };
}

export default async function GeneralQuestionDetailPage({ params }: Props) {
  const { assemblyId, questionId } = await params;

  const [assembly, question] = await Promise.all([
    getAssemblyById(assemblyId),
    getGeneralQuestionById(questionId),
  ]);

  if (!assembly || !question || question.assembly_id !== assembly.id) {
    notFound();
  }

  return (
    <div className="bg-mirai-surface-muted">
      <Container className="py-8">
        <GeneralQuestionDetail question={question} />
      </Container>

      <Container className="py-8">
        <nav className="flex items-center gap-2 text-[15px] flex-wrap">
          <Link href={routes.home()} className="text-black">
            TOP
          </Link>
          <ChevronRight className="h-5 w-5 text-black" />
          <Link
            href={routes.generalQuestionList(assembly.id) as Route}
            className="text-black"
          >
            {assembly.name}
          </Link>
          <ChevronRight className="h-5 w-5 text-black" />
          <span className="text-black">{question.title}</span>
        </nav>
      </Container>
    </div>
  );
}
