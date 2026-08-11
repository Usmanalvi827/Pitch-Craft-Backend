// Shared writing-style instruction used by every prompt builder. Keeping
// this in one place means a wording tweak only has to happen once instead
// of six times across every module's prompt.
export const SIMPLE_LANGUAGE_INSTRUCTIONS = `
Write your answer in simple, everyday English. The founder reading this may
not know business or technical terms, so:

- Use short, clear sentences.
- Avoid jargon, buzzwords, and complicated vocabulary.
- Do not use academic or overly "corporate" language.
- Explain things the way you'd explain them to a smart friend, not a textbook.
- Do not repeat the same idea in different words.
- Each item in a list should be one short, clear sentence or phrase.

Keep it professional, clear, and useful - simple, not simplistic. Do not
change the meaning or accuracy of your analysis, only how it's written.
`;