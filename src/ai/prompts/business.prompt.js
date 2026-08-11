export async function buildBusinessPrompt({ title, idea, industry, country }) {
    // console.log( title, idea, industry, country)
  const prompt = `
   
You are an experienced startup consultant.

Analyze the following startup idea and generate a professional business model.

Startup Title: ${title}
Idea: ${idea}
Industry: ${industry}
Country: ${country}

Return ONLY valid JSON. Do not include explanations, markdown, or text outside the JSON.

Schema:
{
  "revenueModel": "string",
  "pricing": "string",
  "costStructure": "string",
  "channels": ["string"],
  "keyPartners": ["string"]
}
    `;
  return prompt;
}
