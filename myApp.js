require('dotenv').config();
let express = require('express');
let app = express();

console.log('[BOOT] Aplicação Express inicializada');

app.use(function(req, res, next) {
  console.log(`[GLOBAL MIDDLEWARE] ${req.method} ${req.path} - IP: ${req.ip}`);
  next();
});

app.use('/public', express.static(__dirname + '/public'));

// app.get('/', function(req, res) {
//   res.send('Hello Express');
// });

app.get('/', function(req, res) {
  console.log('[ROUTE] GET / - Enviando index.html');
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/json', function(req, res) {
  let message = 'Hello json';
  console.log('[ROUTE] GET /json - MESSAGE_STYLE:', process.env.MESSAGE_STYLE);
  if (process.env.MESSAGE_STYLE === 'uppercase') {
    message = message.toUpperCase();
  }
  res.json({ message });
  console.log('[ROUTE] GET /json - Resposta enviada:', { message });
});

app.get('/now', function(req, res, next) {
  req.time = new Date().toString();
  console.log('[ROUTE] GET /now - Middleware: req.time set to', req.time);
  next();
}, function(req, res) {
  res.json({ time: req.time });
  console.log('[ROUTE] GET /now - Resposta enviada:', { time: req.time });
});

// Middleware de tratamento de erro
app.use(function(err, req, res, next) {
  console.error('[ERROR] Middleware de erro capturado:', err);
  res.status(500).json({ error: 'Erro interno do servidor', details: err.message });
});

module.exports = app;
