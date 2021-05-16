const { Subject, fromEvent } = require('rxjs');
const { createHash } = require('crypto');
const { event, constants } = require('../emitter');
const { CHAIN } = require('./constants');
const { getCollection } = require('../database');
const { map, filter } = require('rxjs/operators');

let current = null;
const subject = new Subject();
const validBlockSource = fromEvent(event, constants.VALID_BLOCK);

const start = async (genesis) => {
  current =  current;
  const collection = getCollection(CHAIN);
  event.emit(constants.HASH_BLOCK, genesis);
};

subject.subscribe((data) => {
  console.log(data);
});

validBlockSource.subscribe(async (data) => {
  const collection = getCollection(CHAIN);
  await collection.insert(data);
});

module.exports = {
  start,
  observable: subject.asObservable(),
};
