const { Router } = require('express');
// ensure backend exports this as shown below
const { toRovarspraket } = require('@acme/backend');

const r = Router();
r.post('/', (req, res) => {
  const { text } = req.body ?? {};
  try {
    res.json({ result: toRovarspraket(text) });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});
module.exports = r;
