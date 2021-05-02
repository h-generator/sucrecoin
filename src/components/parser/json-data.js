const fs = require('fs');

const read = (file) => {
  if (!file) {
    throw new Error('data is indefined');
  }
  return new Promise((resolve, reject) => {
    fs.readFile(`./data/${file}.json`, (err, data) => {
      if (err) return resolve(null);
      resolve(JSON.parse(data));
    });
  });
};

const write = (file, data) => {
  if (!file) {
    throw new Error('data is indefined');
  }
  if (!data) {
    throw new Error('data is indefined');
  }
  return new Promise((resolve, reject) => {
    fs.writeFile(`./data/${file}.json`, JSON.stringify(data), (err) => {
      if(err) return reject(err);
      resolve();
    })
  });
};

module.exports = {
  read,
  write,
};
