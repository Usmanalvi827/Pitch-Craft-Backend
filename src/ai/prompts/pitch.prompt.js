// src/prompts/pitch.prompt.js
export function buildPitchPrompt({ title, idea, industry, country }) {
  return `
You are an experienced startup consultant.

Analyze the following startup idea and generate a professional pitch.

Startup Title: ${title}
Idea: ${idea}
Industry: ${industry}
Country: ${country}

Return ONLY valid JSON. Do not include explanations, markdown, or text outside the JSON.

Schema:
{
  "elevatorPitch": "string",
  "investorPitch": "string",
  "presentation": "string"
}
`;
}
