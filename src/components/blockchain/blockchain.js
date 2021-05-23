const { Subject, fromEvent } = require('rxjs');
const { createHash } = require('crypto');
const { event, constants } = require('../emitter');
const { CHAIN } = require('./constants');
const { getCollection } = require('../database');
const { map, filter } = require('rxjs/operators');
const { compress, decompress, generateBlock } = require('./helper');

let current = null;
const subject = new Subject();
const validBlockSource = fromEvent(event, constants.VALID_BLOCK);

const start = async (genesis = null) => {
  console.log('current');
  current =  genesis;
  const collection = getCollection(CHAIN);
  const items = await collection.find().sort({ index: -1 }).limit(1).toArray()
  const item = items.shift();
  if (item) {
    current = generateBlock(decompress(item.block));
  }
  event.emit(constants.HASH_BLOCK, current);
};

subject.subscribe((data) => {
  console.log(data);
});

validBlockSource.subscribe(async (data) => {
  console.log(`new block found: ${data.index} ${data.hash}`);
  const collection = getCollection(CHAIN);
  await collection.insertOne({
    index: data.index,
    hash: data.hash,
    block: compress(data),
  });
  // await start();
});

module.exports = {
  start,
  observable: subject.asObservable(),
};
