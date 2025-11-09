// -----------------------------------------------------
// SMS Integration using Twilio + Node.js + Express
// -----------------------------------------------------

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

// Initialize Twilio client
const client = new twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// -----------------------------------------------------
// ROUTE 1: Send SMS
// -----------------------------------------------------
app.get('/send', async (req, res) => {
  try {
    const message = await client.messages.create({
      body: 'Hello! 👋 This is an SMS from Node.js using Twilio API.',
      from: process.env.TWILIO_PHONE_NUMBER, // your Twilio number
      to: process.env.MY_PHONE_NUMBER        // recipient number
    });

    console.log('✅ Message SID:', message.sid);
    res.send('SMS sent successfully!');
  } catch (error) {
    console.error('❌ Error sending SMS:', error);
    res.status(500).send('Failed to send SMS.');
  }
});

// -----------------------------------------------------
// ROUTE 2: Receive Incoming SMS (Webhook)
// -----------------------------------------------------
app.post('/sms', (req, res) => {
  const incomingMsg = req.body.Body;
  const fromNumber = req.body.From;

  console.log(`📩 SMS from ${fromNumber}: ${incomingMsg}`);

  // Respond using TwiML (Twilio Markup Language)
  const twimlResponse = `
    <Response>
      <Message>Thanks! You said: "${incomingMsg}" 🤖</Message>
    </Response>
  `;

  res.set('Content-Type', 'text/xml');
  res.send(twimlResponse);
});

// -----------------------------------------------------
// Start the Express server
// -----------------------------------------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`👉 Try sending SMS: http://localhost:${PORT}/send`);
});
