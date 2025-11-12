
import { GoogleGenAI, Type } from "@google/genai";

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const sloganSchema = {
  type: Type.OBJECT,
  properties: {
    slogans: {
      type: Type.ARRAY,
      description: "An array of 3 unique and catchy slogans.",
      items: {
        type: Type.STRING,
      },
    },
  },
  required: ["slogans"],
};

export async function generateSlogans(description: string): Promise<string[]> {
  try {
    const prompt = `You are an expert branding and marketing copywriter. Based on the following description of an organization, generate exactly 3 unique and catchy slogans. Return the slogans as a JSON object.

Organization Description: "${description}"`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: sloganSchema,
      },
    });

    const jsonString = response.text.trim();
    const parsed = JSON.parse(jsonString);

    if (parsed && Array.isArray(parsed.slogans) && parsed.slogans.length > 0) {
      return parsed.slogans.slice(0, 3); // Ensure we only return 3 slogans
    } else {
      throw new Error("Invalid response format from API");
    }
  } catch (error) {
    console.error("Error generating slogans:", error);
    throw new Error("Could not generate slogans from the provided description.");
  }
}
