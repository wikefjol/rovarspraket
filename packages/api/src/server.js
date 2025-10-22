const express = require('express');
const { add } = require('@acme/backend');

const app = express();
app.use(express.json());

app.post('/add', (req, res) => {
  try {
    const { a, b } = req.body;
    res.json({ result: add(a, b) });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

const PORT = process.env.PORT || 8081;
const HOST = process.env.HOST || '127.0.0.1';
app.listen(PORT, HOST, () => console.log(`API on http://${HOST}:${PORT}`));
