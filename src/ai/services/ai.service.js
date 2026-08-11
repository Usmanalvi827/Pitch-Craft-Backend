import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateWithGemini(prompt, schema = null) {
  const config = {};

  if (schema) {
    config.responseMimeType = "application/json";
    config.responseSchema = schema;
  }

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config,
  });

  return response.text;
}