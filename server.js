import express from "express";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

const genAI = new GoogleGenerativeAI("YOUR_API_KEY");

app.post("/process", async (req, res) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro"
    });

    const result = await model.generateContent([
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: req.body.image
        }
      },
      {
        text: `
        Analyze the image and detect unwanted objects.
        Return a short description of what should be removed.
        `
      }
    ]);

    res.json({ output: result.response.text() });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
