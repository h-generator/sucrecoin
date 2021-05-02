const { server } = require('./server');
const { JsonData } = require('../../parser');
const {
  createECDH,
  ECDH,
} = require('crypto');

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

server.setupMiner = async () => {
  
  const minerKeys = await JsonData.read('miner-keys');
  if (!minerKeys) {
    minerKeys = await generateKeys();
  }

  console.log(minerKeys);

  server.listen(8124, () => {
    console.log('server bound');
  });
};

module.exports = {
  server,
};
