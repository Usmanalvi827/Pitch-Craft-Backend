// src/prompts/features.prompt.js
export function buildFeaturesPrompt({ title, idea, industry, country }) {
  return `
You are an experienced startup consultant.

Analyze the following startup idea and generate a professional features report.

Startup Title: ${title}
Idea: ${idea}
Industry: ${industry}
Country: ${country}

Return ONLY valid JSON. Do not include explanations, markdown, or text outside the JSON.

Schema:
{
  "coreFeatures": ["string"],
  "futureFeatures": ["string"],
  "techStack": ["string"]
}
`;
}
