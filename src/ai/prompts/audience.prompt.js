// src/prompts/audience.prompt.js
import { SIMPLE_LANGUAGE_INSTRUCTIONS } from "./writingStyle.prompt.js";

function buildAudiencePrompt({ title, idea, industry, country }) {
  return `
You are an experienced startup consultant.

Analyze the following startup idea and generate a professional audience profile.

Startup Title: ${title}
Idea: ${idea}
Industry: ${industry}
Country: ${country}

${SIMPLE_LANGUAGE_INSTRUCTIONS}

Return ONLY valid JSON. Do not include explanations, markdown, or text outside the JSON.

Schema:
{
  "targetAudience": "string",
  "customerPersona": "string",
  "painPoints": ["string"],
  "marketSize": "string"
}
`;
}

export default buildAudiencePrompt;