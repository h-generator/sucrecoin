const events = require('./miner.constants');

const listener = (data) => {
  switch(data.type) {
    case events.CONNECTION:
      console.log(`new client id: ${data._id}`);
      break;
    case events.HARVEST:
      break;
    default:
      throw new Error('message type does not exist');
      break;
  }
};

module.exports = { listener };
