require('dotenv').config();
require('dns-cache')();

const makeApps = require('./make/apps');
const makeHashes = require('./make/hashes');

const start = () => {
  const numAccounts = parseInt(process.env.NUMBER_OF_NEW_APPS, 10);
  const chunkedSize = parseInt(process.env.REQUEST_CHUNK_SIZE, 10);
  const minInterval = parseInt(process.env.MIN_APP_INTERVAL_S, 10);
  const maxInterval = parseInt(process.env.MAX_APP_INTERVAL_S, 10);

  return makeApps(numAccounts, chunkedSize, minInterval, maxInterval).then(apis => loop(apis, chunkedSize));
};

const loop = (apis, chunkSize) => {
  return makeHashes(apis, chunkSize).then(_ => loop(apis, chunkSize)).catch(console.log);
};

module.exports = start;
