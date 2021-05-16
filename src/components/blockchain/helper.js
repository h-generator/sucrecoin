
const getBlock = () => {
  return {
    index: 0,
    version: 0,
    hash: null,
    parentHash: null,
    difficulty: 0,
    merkleroot: null,
    coinbase: {
      miner: null,
      reward: null
    },
    trx: [],
    nonce: 0,
    bits: 0,
    time: 0
  };
};

const generateBlock = () => {
  const nextBlock = getBlock();
};

module.exports = {
  getBlock,
  generateBlock,
};
