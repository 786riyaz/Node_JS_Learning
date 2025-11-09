const dialogflow = require('dialogflow');
const uuid = require('uuid');

const projectId = 'testdialogflow-uipy'; // actual project ID from Dialogflow
process.env.GOOGLE_APPLICATION_CREDENTIALS = './config/dialogflow-key.json';

async function runSample() {
  const sessionId = uuid.v4();
  const sessionClient = new dialogflow.SessionsClient();
  const sessionPath = sessionClient.sessionPath(projectId, sessionId);

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: 'Book Ticket',
        languageCode: 'en-US',
      },
    },
  };

  const responses = await sessionClient.detectIntent(request);
  console.log('Detected intent');
  console.log(`Query: ${responses[0].queryResult.queryText}`);
  console.log(`Response: ${responses[0].queryResult.fulfillmentText}`);
}

runSample();
