var express = require('express');
var app = express();

const routes = [
  'home'
];

routes.forEach((route) => {
  const { router } = require(`./${route}`);
  app.use(router);
});

module.exports = {
  app
};
