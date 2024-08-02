const express = require('express');
const bodyParser = require('body-parser');
const Mailjet = require('node-mailjet');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const mailjet = Mailjet.apiConnect(
  process.env.MAILJET_API_KEY,
  process.env.MAILJET_API_SECRET
);

app.post('/send-email', async (req, res) => {
  const { to, subject, text } = req.body;

  try {
    const result = await mailjet
      .post('send', { version: 'v3.1' })
      .request({
        Messages: [
          {
            From: {
              Email: 'dev.queiroz05@gmail.com',
              Name: 'Douglas Queiroz'
            },
            To: [
              {
                Email: to
              }
            ],
            Subject: subject,
            TextPart: text
          }
        ]
      });
    res.status(200).json(result.body);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
