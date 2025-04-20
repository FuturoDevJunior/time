var express = require('express');
var app = express();

// Root-level logger middleware
app.use(function(req, res, next) {
  console.log(req.method + ' ' + req.path + ' - ' + req.ip);
  next();
});

console.log("Hello World");

// Middlewares e rotas:
app.use('/public', express.static(process.cwd() + '/public'));

app.route('/_api/package.json')
  .get(function(req, res, next) {
    var fs = require('fs');
    fs.readFile(__dirname + '/package.json', function(err, data) {
      if(err) return next(err);
      res.type('txt').send(data.toString());
    });
  });

app.route('/')
  .get(function(req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
  });

// 404 handler
app.use(function(req, res, next){
  res.status(404);
  res.type('txt').send('Not found');
});

// Error handler
app.use(function(err, req, res, next) {
  if(err) {
    res.status(err.status || 500)
      .type('txt')
      .send(err.message || 'SERVER ERROR');
  }
});

module.exports = app; 