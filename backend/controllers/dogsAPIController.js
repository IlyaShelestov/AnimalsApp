const https = require("node:https");
const config = require("../config.js");

function fetchImageData(resolve, reject) {
  let url = config.dogs.apiUrl;

  https
    .get(url, (res) => {
      let rawData = "";

      res.on("data", (chunk) => {
        rawData += chunk;
      });

      res.on("end", () => {
        try {
          const APIdata = JSON.parse(rawData);
          if (APIdata.url && APIdata.url.endsWith(".mp4")) {
            fetchImageData(resolve, reject);
          } else {
            resolve(APIdata);
          }
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
}

function getImageData() {
  return new Promise((resolve, reject) => {
    fetchImageData(resolve, reject);
  });
}

module.exports = { getImageData };
