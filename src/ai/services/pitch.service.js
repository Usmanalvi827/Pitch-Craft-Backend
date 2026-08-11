import z from "zod";
import { buildPitchPrompt } from "../prompts/pitch.prompt.js";
import zodToJsonSchema from "zod-to-json-schema";
import { generateWithGemini } from "./ai.service.js";

export const pitchSchema = z.object({
  elevatorPitch: z.string(),
  investorPitch: z.string(),
  presentation: z.string(),
});

export async function pitchReportGenerateByAi({
  title,
  idea,
  industry,
  country,
}) {
  const prompt = await buildPitchPrompt({
    title,
    idea,
    industry,
    country,
  });

  const jsonSchema = zodToJsonSchema(pitchSchema);

  const rawData = await generateWithGemini(prompt, jsonSchema);

  return pitchSchema.parse(JSON.parse(rawData));
}
