const express = require('express');
const bodyParser = require('body-parser');
const sendEmail = require('./emailService');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

app.post('/send-email', async (req, res) => {
  const { email } = req.body;

  try {
    await sendEmail(email);
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
