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
    let url = `${config.cats.imagesUrl}?api_key=${config.cats.apiKey}`;

    if (breed) {
      url += "&has_breeds=1";
    }

    console.log(url);

    https
      .get(url, (res) => {
        let rawData = "";

        res.on("data", (chunk) => {
          rawData += chunk;
        });

        res.on("end", () => {
          try {
            const APIdata = JSON.parse(rawData);
            console.log(APIdata);
            resolve(APIdata[0].url);
          } catch (e) {
            console.error(e.message);
            reject("Error parsing JSON");
          }
        });
      })
      .on("error", (e) => {
        console.error(`Got error: ${e.message}`);
        reject("Error making HTTP request");
      });
  });
}

module.exports = { getFactData, getImageData };
