const array = require('../helpers/array');
const random = require('../helpers/random');
const setup = require('../helpers/setup');

const makeAllApps = (length, chunkSize, minInterval, maxInterval) => {
  console.log("creating", length, "apps in batches of", chunkSize);
  const apis = [];
  const chunks = array.makeChunks(Array.from({ length }), chunkSize);
  return chunks.reduce((p, chunk) => p.then(() => makeApps(chunk, minInterval, maxInterval)).then(_apis => {
    apis.push(..._apis);
    console.log("   ", _apis.map(a => a.appId).join('\n    '));
    return apis;
  }), Promise.resolve());
};

const makeApps = (length, minInterval, maxInterval) => {
  console.log("  creating", length.length, "apps...")
  const apis = [];
  length.forEach((_, __) => apis.push(setup.freshAppInstance(random.randomInt(minInterval, maxInterval))));
  return Promise.all(apis);
};

module.exports = makeAllApps;
