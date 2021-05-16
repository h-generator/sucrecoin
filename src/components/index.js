const { startStorage, getCollection } = require('./database');
const { encoder } = require('./encoder');
const { iot } = require('./iot');
const { app } = require('./server');
const miner = require('./miner-exchange');
const blockchain = require('./blockchain');
//const exchange = require('./miner-exchange');
const { JsonData } = require('./parser');

module.exports = {
  startStorage,
  getCollection,
  encoder,
  iot,
  app,
  miner,
  blockchain,
  JsonData,
};
