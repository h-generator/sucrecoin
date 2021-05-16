const net = require('net');
const { EVENTS } = require('./events.constants');

const server = net.createServer();

server.on(EVENTS.CLOSE, () => {
  console.log('server has been closed');
});

server.on(EVENTS.LISTENING, () => {
  console.log('server is listening..');
});

server.on(EVENTS.ERROR, (err) => {
  console.log(err);
});

module.exports = {
  server
};
