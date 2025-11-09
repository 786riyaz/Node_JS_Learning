import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { IamAuthenticator } from "ibm-cloud-sdk-core";
import AssistantV2 from "ibm-watson/assistant/v2.js";

dotenv.config(); // ✅ Load environment variables from .env

const app = express();
app.use(bodyParser.json());

// === Watson Assistant Configuration ===
const assistant = new AssistantV2({
  version: "2021-06-14",
  authenticator: new IamAuthenticator({
    apikey: process.env.WATSON_API_KEY,
  }),
  serviceUrl: process.env.WATSON_URL,
});

// === Create a new session ===
let sessionId;

async function createSession() {
  try {
    const session = await assistant.createSession({
      assistantId: process.env.WATSON_ASSISTANT_ID,
    });
    sessionId = session.result.session_id;
    console.log("🟢 Watson session created:", sessionId);
  } catch (err) {
    console.error("❌ Failed to create Watson session:", err);
  }
}

// Initialize session on server start
await createSession();

// === API endpoint to send message ===
app.post("/message", async (req, res) => {
  try {
    const text = req.body.text || "";

    // If session expired, recreate
    if (!sessionId) await createSession();

    const response = await assistant.message({
      assistantId: process.env.WATSON_ASSISTANT_ID,
      sessionId: sessionId,
      input: {
        message_type: "text",
        text: text,
      },
    });

    // Extract Watson response
    const output = response.result.output.generic
      .map((item) => item.text)
      .join("\n");

    res.json({
      query: text,
      response: output,
      intent: response.result.output.intents[0]?.intent || "None",
    });
  } catch (error) {
    console.error("Watson Error:", error);
    res.status(500).json({ error: "Error communicating with Watson Assistant" });
  }
});

app.listen(process.env.PORT || 3000, () =>
  console.log(`🚀 Server running at http://localhost:${process.env.PORT || 3000}`)
);
