import z from "zod";
import { buildBusinessPrompt } from "../prompts/business.prompt.js";
import zodToJsonSchema from "zod-to-json-schema";
import { generateWithGemini } from "./ai.service.js";

export const businessSchema = z.object({
  revenueModel: z.string(),
  pricing: z.string(),
  costStructure: z.string(),
  channels: z.array(z.string()),
  keyPartners: z.array(z.string()),
});

export async function businessReportGenerateByAi({ title, idea, industry, country }) {

    const prompt = await buildBusinessPrompt({ title, idea, industry, country })

    // console.log("prompt =>", prompt)
    // return

    // Convert Zod schema to standard JSON Schema for Gemini API
  const jsonSchema = zodToJsonSchema(businessSchema);

  const rawData = await generateWithGemini(prompt, jsonSchema);

  return businessSchema.parse(JSON.parse(rawData));

}
