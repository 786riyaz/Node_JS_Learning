const express = require('express');
const dialogflow = require('dialogflow');
const uuid = require('uuid');

const app = express();
app.use(express.json());

const projectId = 'testdialogflow-uipy'; // actual project ID from Dialogflow
process.env.GOOGLE_APPLICATION_CREDENTIALS = './config/dialogflow-key.json';

app.post('/message', async (req, res) => {
  const { message } = req.body;

  const sessionId = uuid.v4();
  const sessionClient = new dialogflow.SessionsClient();
  const sessionPath = sessionClient.sessionPath(projectId, sessionId);

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: message,
        languageCode: 'en-US',
      },
    },
  };

  const responses = await sessionClient.detectIntent(request);
  const result = responses[0].queryResult;
  console.log("Result:", result);
  console.log("fulfillmentMessages:", result?.fulfillmentMessages);
  console.log("fulfillmentMessages:", JSON.stringify(result?.fulfillmentMessages));
  // console.log("payload:", result?.fulfillmentMessages?.payload);
  // console.log("payload:", result?.fulfillmentMessages?.platform);

  const fulfillmentMessages = result.fulfillmentMessages || [];
  let customPayload = null;

  fulfillmentMessages.forEach(msg => {
    if (msg.payload) {
      customPayload = msg.payload;
    }
  });

  // Final response structure with custom payload handling
  res.json({
    query: result.queryText,
    intent: result.intent.displayName,
    textResponse: result.fulfillmentText || null,
    jsonResponse: customPayload || null,
  });

  // Alternative simpler response without custom payload handling
  res.json({
    query: result.queryText,
    response: result.fulfillmentText,
    intent: result.intent.displayName,
  });
});

app.listen(3000, () => console.log('Server running on port 3000'));
