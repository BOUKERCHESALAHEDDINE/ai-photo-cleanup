import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();
app.use(express.json());

const genAI = new GoogleGenerativeAI("YOUR_API_KEY");

app.post("/process", async (req, res) => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

  const result = await model.generateContent([
    {
      inlineData: {
        mimeType: "image/jpeg",
        data: req.body.image,
      },
    },
    { text: "Analyze image and detect unwanted regions" },
  ]);

  res.json({ output: result.response.text() });
});

app.listen(3000, () => console.log("Server running"));
