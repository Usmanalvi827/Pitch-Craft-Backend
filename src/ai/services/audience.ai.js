import z from "zod";
import buildAudiencePrompt from "../prompts/audience.prompt.js";
import zodToJsonSchema from "zod-to-json-schema";
import { generateWithGemini } from "./ai.service.js";

export const audienceSchema = z.object({
  targetAudience: z.string(),
  customerPersona: z.string(),
  painPoints: z.array(z.string()),
  marketSize: z.string(),
});

export async function audienceReportGenerateByAi({
  title,
  idea,
  industry,
  country,
}) {
  const prompt = await buildAudiencePrompt({ title, idea, industry, country });

  const jsonSchema = zodToJsonSchema(audienceSchema);

  const rawData = await generateWithGemini(prompt, jsonSchema);

  return audienceSchema.parse(JSON.parse(rawData));
}
