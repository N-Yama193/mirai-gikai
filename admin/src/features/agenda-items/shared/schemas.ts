import { z } from "zod";

export const agendaSummarySchema = z.object({
  points: z
    .array(z.string())
    .describe("審議のポイント（2〜4個程度、各30〜50字程度）"),
  conclusion: z.string().describe("議案の要旨・結論を100字程度で"),
});
export type AgendaSummaryResult = z.infer<typeof agendaSummarySchema>;
