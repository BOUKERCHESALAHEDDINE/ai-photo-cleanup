import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("YOUR_API_KEY");

export async function processImage(base64Image) {
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro"
  });

  const result = await model.generateContent([
    {
      inlineData: {
        mimeType: "image/jpeg",
        data: base64Image,
      },
    },
    {
      text: `
      Analyze the image and suggest regions for cleanup and reconstruction.
      Return structured JSON with bounding boxes.
      `,
    },
  ]);

  return result.response.text();
}
