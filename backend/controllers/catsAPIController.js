const https = require("node:https");
const config = require("../config.js");

//SECOND API
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

//THIRD API
function getImageData(breed) {
  return new Promise((resolve, reject) => {
    let url = config.cats.imagesUrl;

    if (breed) {
      url = url + "?has_breeds=1";
    }

    https.get(url, (res) => {
      res.on("data", (data) => {
        let APIdata = JSON.parse(data);

        resolve(APIdata[0].url);
      });
    });
  });
}

module.exports = { getFactData, getImageData };
