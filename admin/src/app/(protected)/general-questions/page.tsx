import { GeneralQuestionSummaryList } from "@/features/general-questions/server/components/general-question-summary-list";
import { loadGeneralQuestionsForSummary } from "@/features/general-questions/server/loaders/load-general-questions-for-summary";

export default async function GeneralQuestionsPage() {
  const questions = await loadGeneralQuestionsForSummary();

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-8">一般質問AI要約管理</h1>

      <section className="rounded-lg border bg-white p-6">
        <GeneralQuestionSummaryList questions={questions} />
      </section>
    </div>
  );
}
