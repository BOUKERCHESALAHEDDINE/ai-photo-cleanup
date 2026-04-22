import { GoogleGenerativeAI } from "@google/generative-ai";

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
        text: "Describe what objects in this image could be removed."
      }
    ]);

    const response = result.response;
    const text = response.candidates?.[0]?.content?.parts?.[0]?.text || "No response";

    res.json({ output: text });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

  return result.response.text();
}
async function sendToAI(base64Image) {
  const response = await fetch("http://localhost:3000/process", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ image: base64Image })
  });

  const data = await response.json();
  console.log(data);
}
