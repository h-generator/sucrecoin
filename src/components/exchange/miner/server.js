const net = require('net');
const { v4 } = require('uuid');
const { interval, fromEvent } = require('rxjs');
const { tap, map } = require('rxjs/operators');
const { encoder } = require('../../encoder');
const { EVENTS } = require('./events.constants');
const { CONNECTION } = require('./miner.constants');
const { listener } = require('./listener');

let sockets = [];
const server = net.createServer();
const source = interval(10000);

server.on(EVENTS.CLOSE, () => {
  console.log('server has been closed');
});

server.on(EVENTS.LISTENING, () => {
  console.log('server is listening..');
});

server.on(EVENTS.ERROR, (err) => {
  throw err;
});

server.on(EVENTS.CONNECTION, (socket) => {
  console.log('client connected: ' + socket.remoteAddress + ':' + socket.remotePort);
  socket._id = v4();
  sockets.push(socket);
  socket.write(encoder.encrypt({ type: CONNECTION, _id: socket._id }));

  const source = fromEvent(socket, EVENTS.DATA);

  const validator = (message) => {
    if (!Buffer.isBuffer(message)) {
      throw new Error('message is indefined');
    }
  };
  
  const decrypt = (message) => {
    console.log('client connected: ' + socket.remoteAddress + ':' + socket.remotePort);
    const encrypted = message.toString();
    const data = encoder.decrypt(encrypted);
    if (!data.type) {
      throw new Error('wrong server message type');
    }
    return data;
  };

  const example = source.pipe(
    tap((message) => validator(message)),
    map((message) => decrypt(message)),
    map((data) => listener(data)),
  );

  const validMessages = (res) => {
    console.log(res);
  };

  const errorMessage = (err) => {
    console.log(err);
  };
  
  const subscribe = example.subscribe({
    res: (res) => validMessages(res),
    error: (err) => errorMessage(err)
  });

  socket.on(EVENTS.CLOSE, function(data) {
    console.log('fineeeeeeeeeeeeeeee');
    console.log(sockets.length);
    console.log(socket._id);
    sockets = sockets.filter((o) => o._id != socket._id);
    
    // let index = sockets.findIndex(function(o) {
    //     return o.remoteAddress === sock.remoteAddress && o.remotePort === sock.remotePort;
    // })
    // if (index !== -1) sockets.splice(index, 1);
    // console.log('CLOSED: ' + sock.remoteAddress + ' ' + sock.remotePort);
  });

  socket.on(EVENTS.END, () => {
    console.log(`'client disconnected: ${socket.remoteAddress}:${socket.remotePort}`);
  });
});

source.subscribe((o) => console.log('total active miners:', sockets.length));

module.exports = {
  server
};
