const https = require("node:https");
const config = require("../config.js");

//FOURTH API
function getWordData(word) {
  return new Promise((resolve, reject) => {
    const url = config.dictionary.apiUrl + word;
    const wordData = {};

    https.get(url, (res) => {
      res.on("data", (data) => {
        let APIdata = JSON.parse(data);
        if ("title" in APIdata) {
          wordData.code = "404";
          wordData.title = APIdata.title;
          resolve(wordData);
          return;
        }

        wordData.code = "200";
        wordData.word = APIdata[0].word;
        wordData.phonetic = APIdata[0].phonetic;
        wordData.partOfSpeech = APIdata[0].meanings[0].partOfSpeech;
        wordData.definition = APIdata[0].meanings[0].definitions[0].definition;

        resolve(wordData);
      });
    });
  });
}

module.exports = { getWordData };
