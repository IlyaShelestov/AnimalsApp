const https = require("node:https");
const config = require("../config.js");

function getFactData() {
  return new Promise((resolve, reject) => {
    const url = config.cats.factsUrl;

    https.get(url, (res) => {
      res.on("data", (data) => {
        let APIdata = JSON.parse(data);

        resolve(APIdata.data[0]);
      });
    });
  });
}

function getImageData() {
  return new Promise((resolve, reject) => {
    const url = config.cats.imagesUrl;

    https.get(url, (res) => {
      res.on("data", (data) => {
        let APIdata = JSON.parse(data);

        resolve(APIdata[0].url);
      });
    });
  });
}

module.exports = { getFactData, getImageData };
