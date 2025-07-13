
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/analyze', (req, res) => {
  const { samples } = req.body;
  res.json({
    tone: 'Conversational and motivational',
    structure: 'Hook → Personal Story → Insight → CTA',
    themes: 'Leadership, Productivity, Career Growth'
  });
});

app.post('/generate', (req, res) => {
  const { topic, style } = req.body;
  const post = `🚀 Here's what I learned about ${topic}:

We often underestimate the power of ${topic}. 
This week, I focused on it and saw a huge change. If you're on the same journey — keep going!

#Career #Growth #Learning`;

  res.json({ post });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Mock API running on http://localhost:${PORT}`));
