
const express = require('express');
const postmark = require('postmark');
const app = express();
const cors = require('cors')

var client = new postmark.ServerClient("3ead73ec-fcfd-4cef-90c9-5f62771f488a");

app.use(express.json(), cors());

// New GET route for the root URL
app.get('/', (req, res) => {
  res.send('<h1> Welcome to the Postmark Email Service!</h1><p>You can use the POST /send-email endpoint to send emails.</p>');

});

app.post('/send-emails', async (req, res) => {
  const { to, subject, message } = req.body;
  try {
    await client.sendEmail({
      "From": "you@example.com",
      "To": to,
      "Subject": subject,
      "TextBody": message,
      "HtmlBody": "<strong>Hello</strong> dear Postmark user.",
      "MessageStream": "outbound"
    });
    res.status(200).send('Email sent successfully');
  } catch (error) {
    res.status(500).send('Error sending 11');
  }
});


app.post('/send-email', async (req, res) => {
  const { to, subject, message } = req.body;
  try {
    await client.sendEmail({
      "From": "orders@syslinkdao.com",
      //"To": "christigiano@yahoo.com",
      "To": "test@blackhole.postmarkapp.com",
      "Subject": "Hello from Postmark Backend",
      "HtmlBody": "<strong>Hello</strong> dear Postmark user.",
      "MessageStream": "outbound"
    });
    res.status(200).send('Email sent successfully');
  } catch (error) {
    res.status(500).send('Error sending 11');
  }
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});



