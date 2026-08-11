import { zodToJsonSchema } from "zod-to-json-schema";
import { z } from "zod";
import { buildOverviewPrompt } from "../prompts/overview.prompt.js";
import { generateWithGemini } from "./ai.service.js";

export const overviewSchema = z.object({
  problem: z.string(),
  solution: z.string(),
  mission: z.string(),
  vision: z.string(),
  valueProposition: z.string(),
});

export async function overViewReportGenerateByAi({
  title,
  idea,
  industry,
  country,
}) {
  const prompt = await buildOverviewPrompt({ title, idea, industry, country });

  // Convert Zod schema to standard JSON Schema for Gemini API
  const jsonSchema = zodToJsonSchema(overviewSchema);

  const rawData = await generateWithGemini(prompt, jsonSchema);

  return overviewSchema.parse(JSON.parse(rawData));
}
