const axios = require('axios');
const topaz = require('topaz');

const apiSetup = (appInterval = 3600) => {
  return new Promise((resolve, reject) => {
    return axios.post(process.env.BASE_PATH + '/apps', { name: 'test app', interval: appInterval }, { headers: { 'Authorization': process.env.API_KEY }})
      .then(res => resolve(res.data.id))
      .catch(err => reject(err));
  });
}

const freshAppInstance = (appInterval) => {
  return apiSetup(appInterval).then(appId => {
    return topaz({ basePath: process.env.BASE_PATH, apiKey: process.env.API_KEY, appId });
  });
}

module.exports = { freshAppInstance }
