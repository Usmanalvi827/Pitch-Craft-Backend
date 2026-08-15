// src/prompts/landingPage.prompt.js
import { SIMPLE_LANGUAGE_INSTRUCTIONS } from "./WritingStyle.prompt.js";


export function buildLandingPagePrompt({ title, idea, industry, country }) {
  return `
You are an experienced startup consultant and UI/UX designer.

Analyze the following startup idea and generate a professional landing page UI.

Startup Title: ${title}
Idea: ${idea}
Industry: ${industry}
Country: ${country}

${SIMPLE_LANGUAGE_INSTRUCTIONS}
(This applies to the headline, subHeadline, callToAction, and sections text -
not to the HTML/CSS code itself.)

Return ONLY valid JSON. Do not include explanations, markdown, or text outside the JSON.

Schema:
{
  "headline": "string",
  "subHeadline": "string",
  "callToAction": "string",
  "sections": ["string"],
  "html": "string",   // full landing page HTML
  "css": "string"     // clean CSS styles
}

The HTML should include:
- A hero banner with headline, subHeadline, and CTA button
- Section blocks for each item in "sections"
- A footer

The CSS should be modern, responsive, and clean.
`;
}