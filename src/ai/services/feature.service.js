import z from "zod";
import { buildFeaturesPrompt } from "../prompts/features.prompt.js";
import zodToJsonSchema from "zod-to-json-schema";
import { generateWithGemini } from "./ai.service.js";

export const featuresSchema = z.object({
  coreFeatures: z.array(z.string()),
  futureFeatures: z.array(z.string()),
  techStack: z.array(z.string()),
});

export async function featuresReportGenerateByAi ({ title, idea, industry, country }) {

    const prompt = await buildFeaturesPrompt({ title, idea, industry, country })

      const jsonSchema = zodToJsonSchema(featuresSchema);

  const rawData = await generateWithGemini(prompt, jsonSchema);

  return featuresSchema.parse(JSON.parse(rawData));

}