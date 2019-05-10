const array = require('../helpers/array');
const random = require('../helpers/random');
const setup = require('../helpers/setup');

const makeAllApps = (numApps, appChunkSize, minInterval, maxInterval) => {
  console.log("creating", numApps, "apps in batches of", appChunkSize);
  const apis = [];
  const chunks = array.makeChunks(Array.from({ length: numApps }), appChunkSize);
  return chunks.reduce((p, chunk) => p.then(() => makeApps(chunk, minInterval, maxInterval)).then(_apis => {
    apis.push(..._apis);
    console.log("   ", _apis.map(a => a.appId).join('\n    '));
    return apis;
  }), Promise.resolve());
};

const makeApps = (numApps, minInterval, maxInterval) => {
  console.log("  creating", numApps.length, "apps...")
  const apis = [];
  numApps.forEach((_, __) => apis.push(setup.freshAppInstance(random.randomInt(minInterval, maxInterval))));
  return Promise.all(apis);
};

module.exports = makeAllApps;
