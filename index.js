const express = require('express');
const app = express();

// Middleware para CORS (para testes freeCodeCamp)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

// Endpoint raiz opcional
app.get('/', (req, res) => {
  res.send('Timestamp Microservice');
});

// Função utilitária para resposta de data
function getTimeResponse(date) {
  if (isNaN(date.getTime())) {
    return { error: 'Invalid Date' };
  }
  return {
    unix: date.getTime(),
    utc: date.toUTCString(),
  };
}

// Endpoint principal
app.get('/api/:date*?', (req, res) => {
  let date = req.params.date;
  if (Array.isArray(date)) date = date.join('');
  let parsedDate;

  if (!date) {
    parsedDate = new Date();
  } else if (/^\d+$/.test(date)) {
    // Se for só dígitos, tratar como timestamp em milissegundos
    parsedDate = new Date(Number(date));
  } else {
    parsedDate = new Date(date);
  }

  res.json(getTimeResponse(parsedDate));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 