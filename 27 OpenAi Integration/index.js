import express from "express";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Basic route
app.get("/", (req, res) => {
  res.send("OpenAI integration running!");
});

// Chat route
app.post("/api/chat", async (req, res) => {
  try {
    const { prompt } = req.body;

    const completion = await openai.chat.completions.create({
      // model: "gpt-4o-mini", // you can also use "gpt-4o" or "gpt-3.5-turbo"
      model: "gpt-3.5-turbo", // you can also use "gpt-4o" or "gpt-3.5-turbo"
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt },
      ],
    });

    res.json({
      reply: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/image", async (req, res) => {
  const { prompt } = req.body;
  const image = await openai.images.generate({
    model: "gpt-image-1",
    prompt,
    size: "512x512",
  });
  res.json({ url: image.data[0].url });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
