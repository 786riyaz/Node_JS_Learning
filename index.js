import express from "express";
import { LexRuntimeV2Client, RecognizeTextCommand } from "@aws-sdk/client-lex-runtime-v2";

const app = express();
app.use(express.json());

// Initialize Lex client
const client = new LexRuntimeV2Client({ region: "us-east-1" }); // change to your region

app.post("/chat", async (req, res) => {
  try {
    const { text, sessionId } = req.body;

    const command = new RecognizeTextCommand({
      botId: "BOT_ID",
      botAliasId: "BOT_ALIAS_ID",
      localeId: "en_US",
      sessionId: sessionId || "default-user",
      text,
    });

    const response = await client.send(command);
    res.json({ message: response.messages });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log("Lex bot connected on http://localhost:3000"));
