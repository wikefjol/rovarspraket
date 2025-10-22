const express = require('express');
const routes = require('./routes');

const app = express();
app.use(express.json());
app.use(routes);

// 404 + error handler
app.use((req,res)=>res.status(404).json({error:'Not Found'}));
app.use((err,req,res,_)=>{
  console.error(err);
  res.status(err.status||500).json({error: err.message || 'Server error'});
});

const PORT = process.env.PORT || 8081;
const HOST = process.env.HOST || '127.0.0.1';
app.listen(PORT, HOST, () => console.log(`API on http://${HOST}:${PORT}`));
