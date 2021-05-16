const events = require('./miner.constants');
const { event, constants } = require('../emitter');

const listener = (data) => {
  switch(data.type) {
    case events.CONNECTION:
      console.log(`new client id: ${data._id}`);
      break;
    case events.HARVEST:
      break;
    case events.VALID_BLOCK:
      event.emit(constants.VALID_BLOCK, data.block);
      break;
    default:
      throw new Error('message type does not exist');
      break;
  }
};

module.exports = { listener };
