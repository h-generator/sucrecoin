var express = require('express');
var { app: routes } = require('./routes');

var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

module.exports = {
  app
};
