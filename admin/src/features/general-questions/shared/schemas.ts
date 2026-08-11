import { z } from "zod";

export const generalQuestionSummarySchema = z.object({
  points: z.array(z.string()).describe("論点（2〜4個程度、各30〜50字程度）"),
  conclusion: z.string().describe("結論・町の対応方針を100字程度で"),
});
export type GeneralQuestionSummaryResult = z.infer<
  typeof generalQuestionSummarySchema
>;
