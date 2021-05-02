const { MongoClient } = require('mongodb');

const config = require('../../config');
let database = null;

const startStorage = async () => {
  const client = new MongoClient(config.database.uri, {
    useUnifiedTopology: true
  });
  try {
    await client.connect();
    database = client.db(config.database.name);
    console.log('connected successfully to database');
  } catch(err) {
    console.log(err);
  } finally {
    await client.close();
  }
};

const getCollection = (collection) => {
  if (!collection) {
    throw new Error('collection is undefined');
  }
  return database.collection(collection);
};

module.exports = {
  startStorage,
  getCollection
};
