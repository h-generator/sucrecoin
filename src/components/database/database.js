const { MongoClient } = require('mongodb');

const config = require('../../config');
let database = null;
// const client = new MongoClient(
//   uri, { useUnifiedTopology: true},
//    { useNewUrlParser: true },
//     { connectTimeoutMS: 30000 }, { keepAlive: 1});
const startStorage = async () => {
  const client = new MongoClient(config.database.uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  try {
    await client.connect();
    database = client.db(config.database.name);
    console.log('connected successfully to database');
  } catch(err) {
    console.log(err);
  }
};

const closeStorage = async () => {
  await client.close();
};

const getCollection = (collection) => {
  if (!collection) {
    throw new Error('collection is undefined');
  }
  return database.collection(collection);
};

module.exports = {
  startStorage,
  closeStorage,
  getCollection
};
