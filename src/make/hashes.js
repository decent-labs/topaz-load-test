const array = require('../helpers/array');
const random = require('../helpers/random');

const makeAllHashes = (apis, chunkSize) => {
  console.log("creating", apis.length, "new hashes in batches of", chunkSize)
  return array.makeChunks(apis, chunkSize).reduce((p, chunk) => p.then(() => makeHashes(chunk)).then(_hashes => {
    console.log("   ", _hashes.map(h => h.object.hashes[h.object.hashes.length - 1].hash).join('\n    '));
    return _hashes;
  }), Promise.resolve());
};

const makeHashes = (apis) => {
  console.log("  creating", apis.length, "hashes...")
  const hashes = [];
  apis.forEach(api => hashes.push(api.trust(random.hexString(10))));
  return Promise.all(hashes);
};

module.exports = makeAllHashes;
