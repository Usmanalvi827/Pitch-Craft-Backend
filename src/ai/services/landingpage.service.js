import zodToJsonSchema from "zod-to-json-schema";
import { buildLandingPagePrompt } from "../prompts/landingpage.prompt.js";
import { generateWithGemini } from "./ai.service.js";
import z from "zod";

export const landingPageSchema = z.object({
  headline: z.string(),
  subHeadline: z.string(),
  callToAction: z.string(),
  sections: z.array(z.string()),
  html: z.string(),
  css: z.string(),
});
export async function landingPageReportGenerateByAi({
  title,
  idea,
  industry,
  country,
}) {
  const prompt = await buildLandingPagePrompt({
    title,
    idea,
    industry,
    country,
  });

  const jsonSchema = zodToJsonSchema(landingPageSchema);

  const rawData = await generateWithGemini(prompt, jsonSchema);

  return landingPageSchema.parse(JSON.parse(rawData));
}
