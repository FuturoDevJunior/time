// Trigger redeploy - ajuste mínimo para forçar novo build
require('dotenv').config();
let express = require('express');
let app = express();

app.use(function(req, res, next) {
  next();
});

app.use('/public', express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/json', function(req, res) {
  let message = 'Hello json';
  if (process.env.MESSAGE_STYLE === 'uppercase') {
    message = message.toUpperCase();
  }
  res.json({ message });
});

app.get('/now', function(req, res, next) {
  req.time = new Date().toString();
  console.log(`[MIDDLEWARE /now] req.time set to: ${req.time}`);
  next();
}, function(req, res) {
  console.log(`[HANDLER /now] Responding with:`, { time: req.time });
  res.json({ time: req.time });
});

// Endpoint de teste para FCC
app.get('/_api/chain-middleware-time', function(req, res, next) {
  req.time = new Date().toString();
  next();
}, function(req, res) {
  res.json({ time: req.time });
});

// Endpoint de health check
app.get('/health', function(req, res) {
  const now = new Date().toISOString();
  res.json({ status: 'ok', deployedAt: now, message: 'Health check endpoint' });
});

app.use(function(err, req, res, next) {
  res.status(500).json({ error: 'Erro interno do servidor', details: err.message });
});

module.exports = app;
