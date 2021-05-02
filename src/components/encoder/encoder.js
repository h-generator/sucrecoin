const { randomBytes, createCipheriv, createDecipheriv } = require('crypto');
const { miner } = require('../../config');
const { IV, ALGORITHM, ENCODE_TYPE } = require('./constants');

let _secret = null;

const setSecret = (secret) => {
  _secret = secret;
}

const encrypt = (data) => {
  if (!_secret) {
    throw new Error('_secret is undefined');
  }
  if (!data) {
    throw new Error('data is undefined');
  }
  const vector = randomBytes(IV);
  const cipher = createCipheriv(ALGORITHM, _secret, vector);
  const message = cipher.update(JSON.stringify(data), ENCODE_TYPE.UTF8);
  return  [
    vector.toString(ENCODE_TYPE.HEX),
    Buffer.concat([message, cipher.final()]).toString(ENCODE_TYPE.HEX)
  ].join(':');
};

const decrypt = (encrypted) => {
  if (!_secret) {
    throw new Error('_secret is undefined');
  }
  if (!encrypted) {
    throw new Error('encrypted is undefined');
  }
  let data = encrypted.split(':');
  let iv = Buffer.from(data.shift(), ENCODE_TYPE.HEX);
  console.log(iv);
  const decipher = createDecipheriv(ALGORITHM, _secret, iv);
  let decrypted = decipher.update(data.shift(), ENCODE_TYPE.HEX, ENCODE_TYPE.UTF8);
  decrypted += decipher.final(ENCODE_TYPE.UTF8);
  return JSON.parse(decrypted);
};

module.exports = { encrypt, decrypt, setSecret };


// const decrypt = (encrypted) => {
//   let data = encrypted.split(':');
//   let iv = Buffer.from(data.shift(), 'hex');
//   const decipher = createDecipheriv(algorithm, 'exchange-secret-password', iv);
//   let decrypted = decipher.update(data.shift(), 'hex', 'utf8');
//   decrypted += decipher.final('utf8');
//   return JSON.parse(decrypted);
// };