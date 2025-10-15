require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({ origin: '*' }));

// Nodemailer transporter with SMTP
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // true for SSL, false for TLS/STARTTLS (use true for port 465)
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Email sending endpoint
app.post('/send-email', async (req, res) => {
  try {
    const { name, subject, email, message } = req.body;
    if (!name || !subject || !email || !message) {
      return res.status(400).json({ status: 'error', message: 'Missing required fields' });
    }

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: `${name} <${email}>`,
      replyTo: process.env.REPLY_TO,
      subject: subject,
      text: message,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    res.status(200).json({ status: 'success', message: 'Email sent successfully' });
  } catch (err) {
    console.error('Error sending email:', err);
    res.status(500).json({ status: 'error', message: 'Error sending email, please try again.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
