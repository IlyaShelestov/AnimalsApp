const https = require('node:https');
const config = require("./config.js");


const getWeatherData = async (city) => {
  const url = config.openWeatherMap.apiUrl + "q=" + city + "&appid=" + config.openWeatherMap.apiKey;
  let weatherData = {}
  https.get(url, (res) =>{
    res.on("data", (data) => {
      weatherData = JSON.parse(data);
    })
  })

  return weatherData;
}

//TODO: Finish this.