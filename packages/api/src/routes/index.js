const { Router } = require('express');
const add = require('./add');
const rovar = require('./rovar');

const r = Router();
r.use('/add', add);
r.use('/rovar', rovar);   // will 404 until you create it
module.exports = r;
