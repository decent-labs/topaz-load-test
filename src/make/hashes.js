const array = require('../helpers/array');
const random = require('../helpers/random');

const makeAllHashes = (apis, numHashesPerApp, hashPerAppChunk) => {
  const chunks = array.makeChunks(apis, hashPerAppChunk);
  const hashBatchRequestSize = chunks[0].length * numHashesPerApp;
  console.log("creating", chunks.length * hashBatchRequestSize, "hashes,",
    numHashesPerApp, "for each of", apis.length, "apps, in", chunks.length,
    "batches of up to", hashBatchRequestSize, "requests at a time")
  return chunks.reduce(
    (p, chunk) => p.then(() => {
      return makeHashesForApiChunks(chunk, numHashesPerApp)
    }).then(_hashes => _hashes), Promise.resolve()
  );
};

const makeHashesForApiChunks = (apis, numHashesPerApp) => {
  const hashCount = numHashesPerApp * apis.length;
  console.log("  creating", hashCount, "hashes for", apis.length, "apps")
  const hashes = [];
  apis.forEach(api => {
    hashes.push(...makeHashesForApi(api, numHashesPerApp))
  });
  return Promise.all(hashes);
};

const makeHashesForApi = (api, numHashesPerApp) => {
  console.log("    creating", numHashesPerApp, "hashes for", api.appId)
  const hashes = [];
  for (let i = 0; i < numHashesPerApp; i++) {
    hashes.push(api.trust(random.hexString(10)));
  }
  return hashes;
}

module.exports = makeAllHashes;
