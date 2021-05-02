const net = require('net');
const { encoder } = require('../../encoder');

const { v4 } = require('uuid');

let sockets = [];
const server = net.createServer();

server.on('close', () => {
  console.log('server has been closed');
});

server.on('listening', () => {
  console.log('server is listening..');
});

server.on('error', (err) => {
  throw err;
});

server.on('connection', (socket) => {

  console.log('client connected: ' + socket.remoteAddress + ':' + socket.remotePort);
  socket._id = v4();
  sockets.push(socket);
  //socket.write(encoder.encrypt({ _id: socket._id }));

  socket.on('data', (message) => {
    try {
      if (!Buffer.isBuffer(message)) {
        throw new Error('message is indefined');
      }
      console.log(message.toString());

      console.log('client connected: ' + socket.remoteAddress + ':' + socket.remotePort);
      const encrypted = message.toString();
      const data = encoder.decrypt(encrypted);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  });

  // socket.on('close', function(data) {
  //   let index = sockets.findIndex(function(o) {
  //       return o.remoteAddress === sock.remoteAddress && o.remotePort === sock.remotePort;
  //   })
  //   if (index !== -1) sockets.splice(index, 1);
  //   console.log('CLOSED: ' + sock.remoteAddress + ' ' + sock.remotePort);
  // });

  socket.on('end', () => {
    console.log(`'client disconnected: ${socket.remoteAddress}:${socket.remotePort}`);
  });
});

module.exports = {
  server
};
