const { v4 } = require('uuid');
const { createECDH, ECDH } = require('crypto');
const { tap, map } = require('rxjs/operators');
const { Subject, fromEvent, interval } = require('rxjs');
const { server } = require('./server');
const { JsonData } = require('../parser');
const { encoder } = require('../encoder');
const { listener } = require('./listener');
const { observable } = require('../blockchain');
const { EVENTS } = require('./events.constants');
const { event, constants } = require('../emitter');
const { CONNECTION, HARVEST } = require('./miner.constants');

let block = null;
let sockets = [];
const intervalSource = interval(10000);
const minersSource = interval(5000);
const subject = new Subject();
const blockSource = fromEvent(event, constants.HASH_BLOCK);

blockSource.subscribe((data) => {
  block = data;
});

minersSource.subscribe(() => {
  if (!block) {
    return;
  }
  const minersConfig = sockets.map((socket, index) => {
    return {
      data: {
        type: HARVEST,
        strategy: {
          current: index + 1,
          total : sockets.length
        },
        block,
      },
      socket
    };
  });
  minersConfig.forEach((config) => {
    config.socket.write(encoder.encrypt(config.data));
  });
  block = null;
});

const generateKeys = async () => {
  const ecdh = createECDH('secp256k1');
  ecdh.generateKeys();
  const keys = {
    public: ecdh.getPublicKey('hex'),
    private: ecdh.getPrivateKey('hex'),
  };
  console.log(JsonData.write);
  await JsonData.write('miner-keys', keys);
  return keys;
};

server.start = async (port = 8124) => {

  // TODO: not needed any more
  // const minerKeys = await JsonData.read('miner-keys');
  // if (!minerKeys) {
  //   minerKeys = await generateKeys();
  // }
  // console.log(minerKeys);

  server.listen(port, () => {
    console.log('server bound');
  });
};

const validator = ({ message }) => {
  if (!Buffer.isBuffer(message)) {
    throw new Error('message is indefined');
  }
};

const decrypt = ({socket, message}) => {
  const encrypted = message.toString();
  const data = encoder.decrypt(encrypted);
  if (!data.type) {
    throw new Error('wrong server message type');
  }
  console.log(`miner message: ${data.type} ${socket._id}`);
  return data;
};

const subjectPipe = subject.pipe(
  tap((message) => validator(message)),
  map((message) => decrypt(message)),
);

const validMessages = (data) => {
  listener(data);
};

const errorMessage = (err) => {
  console.log(err);
};

subjectPipe.subscribe({
  next: (res) => validMessages(res),
  error: (err) => errorMessage(err)
});

server.on(EVENTS.CONNECTION, (socket) => {
  socket._id = v4();
  console.log(`miner connected: ${socket._id}`);
  sockets.push(socket);
  socket.write(encoder.encrypt({ type: CONNECTION, _id: socket._id }));

  socket.on(EVENTS.DATA, (message) => {
    subjectPipe.next({socket, message});
  });

  socket.on(EVENTS.CLOSE, () => {
    sockets = sockets.filter((o) => o._id != socket._id);
  });

  socket.on(EVENTS.END, () => {
    console.log(`miner disconnected: ${socket._id}`);
  });
});

observable.subscribe((block) => {
  console.log(block);
});

intervalSource.subscribe((o) => console.log('total active miners:', sockets.length));

module.exports = {
  server,
};
