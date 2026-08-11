export async function buildOverviewPrompt({ title, idea, industry, country }) {
  //   console.log(title, idea, industry, country);

 const prompt = `

You are an experienced startup consultant.

Analyze the following startup idea and generate a professional overview.

Startup Title: ${title}
Idea: ${idea}
Industry: ${industry}
Country: ${country}

Return ONLY valid JSON. Do not include explanations, markdown, or text outside the JSON.

{
  "problem": "string",
  "solution": "string",
  "mission": "string",
  "vision": "string",
  "valueProposition": "string"
}


`;

return prompt

}
