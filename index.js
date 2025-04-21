require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const dns = require('dns');
const urlParser = require('url');

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.use(bodyParser.urlencoded({ extended: false }));

// Estrutura de armazenamento em memória
const urlDatabase = [];

// Função para validar URL
function isValidUrl(userInput, cb) {
  let urlObject;
  try {
    urlObject = new URL(userInput);
  } catch (err) {
    return cb(false);
  }
  if (urlObject.protocol !== 'http:' && urlObject.protocol !== 'https:') {
    return cb(false);
  }
  dns.lookup(urlObject.hostname, (err) => {
    if (err) return cb(false);
    cb(true);
  });
}

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

// POST /api/shorturl
app.post('/api/shorturl', (req, res) => {
  const original_url = req.body.url;
  isValidUrl(original_url, (isValid) => {
    if (!isValid) {
      return res.json({ error: 'invalid url' });
    }
    // Verifica se já existe
    let found = urlDatabase.find(entry => entry.original_url === original_url);
    if (found) {
      return res.json({ original_url: found.original_url, short_url: found.short_url });
    }
    // Adiciona novo
    const short_url = urlDatabase.length + 1;
    urlDatabase.push({ original_url, short_url });
    res.json({ original_url, short_url });
  });
});

// GET /api/shorturl/:short_url
app.get('/api/shorturl/:short_url', (req, res) => {
  const short_url = parseInt(req.params.short_url, 10);
  const entry = urlDatabase.find(e => e.short_url === short_url);
  if (entry) {
    return res.redirect(entry.original_url);
  } else {
    return res.json({ error: 'invalid url' });
  }
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
