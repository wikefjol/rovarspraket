const { Router } = require('express');
const { add } = require('@acme/backend');

const r = Router();
r.post('/', (req, res) => {
  const { a, b } = req.body ?? {};
  try {
    res.json({ result: add(a, b) });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});
module.exports = r;
