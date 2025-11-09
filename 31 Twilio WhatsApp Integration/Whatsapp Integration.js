// -----------------------------------------------------
// WhatsApp Integration using Twilio + Node.js + Express
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
// ROUTE 1: Send WhatsApp Message
// -----------------------------------------------------
app.get('/send', async (req, res) => {
  try {
    const message = await client.messages.create({
      from: process.env.TWILIO_WHATSAPP_NUMBER, // Twilio sandbox
      to: process.env.MY_WHATSAPP_NUMBER,       // Your verified number
      body: 'Hello! 👋 This is a WhatsApp message from Node.js using Twilio.'
    });

    console.log('Message SID:', message.sid);
    res.send('✅ WhatsApp message sent successfully!');
  } catch (error) {
    console.error('❌ Error sending message:', error);
    res.status(500).send('Failed to send message.');
  }
});

// -----------------------------------------------------
// ROUTE 2: Receive Incoming WhatsApp Message (Webhook)
// -----------------------------------------------------
app.post('/whatsapp', (req, res) => {
  const incomingMsg = req.body.Body;
  const fromNumber = req.body.From;

  console.log(`📩 WhatsApp message from ${fromNumber}: ${incomingMsg}`);

  // Respond to user
  const twimlResponse = `
    <Response>
      <Message>Hi there! You said: "${incomingMsg}" 🤖</Message>
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
  console.log(`👉 Try sending a message: http://localhost:${PORT}/send`);
});
