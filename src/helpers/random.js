const crypto = require('crypto');

const hexString = (length) => {
  let rs = crypto.randomBytes((length + 1) / 2).toString('hex');
  if (length % 2 == 1) rs = rs.substring(0, rs.length - 1);
  return rs;
}

const randomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = { hexString, randomInt };
