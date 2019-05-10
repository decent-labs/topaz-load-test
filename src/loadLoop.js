require('dotenv').config();
require('dns-cache')();

const makeApps = require('./make/apps');
const makeHashes = require('./make/hashes');

const start = () => {
  const numApps = parseInt(process.env.NUMBER_OF_NEW_APPS, 10);
  const appReqChunkSize = parseInt(process.env.APP_REQ_CHUNK_SIZE, 10);

  const numHashesPerApp = parseInt(process.env.NUM_HASHES_PER_APP, 10);
  const hashPerAppChunk = parseInt(process.env.HASH_PER_APP_CHUNK, 10);
  
  const minInterval = parseInt(process.env.MIN_APP_INTERVAL_S, 10);
  const maxInterval = parseInt(process.env.MAX_APP_INTERVAL_S, 10);

  return makeApps(numApps, appReqChunkSize, minInterval, maxInterval)
    .then(apis => loop(apis, numHashesPerApp, hashPerAppChunk));
};

const loop = (apis, numHashesPerApp, hashPerAppChunk) => {
  return makeHashes(apis, numHashesPerApp, hashPerAppChunk)
    .then(_ => loop(apis, numHashesPerApp, hashPerAppChunk))
    .catch(console.log);
};

module.exports = start;
