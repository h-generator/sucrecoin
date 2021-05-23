
const compress = (block) => {
  return JSON.stringify(block);
};

const decompress = (data) => {
  return JSON.parse(data);
};

const getBlock = () => {
  const block = {
    index: 0,
    version: 1,
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
  return JSON.parse(JSON.stringify(block));
};

const generateBlock = (block) => {
  const nextBlock = getBlock();
  nextBlock.index = block.index + 1;
  nextBlock.parentHash = block.hash;
  nextBlock.difficulty = block.difficulty;
  nextBlock.time = new Date().getTime();
  return nextBlock;
};

module.exports = {
  compress,
  decompress,
  getBlock,
  generateBlock,
};
