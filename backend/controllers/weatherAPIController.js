const https = require("node:https");
const config = require("../config.js");

function getWeatherData(city) {
  return new Promise((resolve, reject) => {
    const url = `${config.openWeatherMap.apiUrl}?q=${city}&appid=${config.openWeatherMap.apiKey}&units=metric`;
    const weatherData = {};

    https.get(url, (res) => {
      res.on("data", (data) => {
        let APIdata = JSON.parse(data);
        weatherData.lon = APIdata.coord.lon;
        weatherData.lat = APIdata.coord.lat;
        weatherData.main = APIdata.weather[0].main;
        weatherData.description = APIdata.weather[0].description;
        weatherData.icon = APIdata.weather[0].icon;
        weatherData.feels_like = APIdata.main.feels_like;
        weatherData.temperature = APIdata.main.temp;
        weatherData.pressure = APIdata.main.pressure;
        weatherData.humidity = APIdata.main.humidity;
        weatherData.wind = APIdata.wind.speed;
        weatherData.country = APIdata.sys.country;

        resolve(weatherData);
      });
    });
  });
}

module.exports = { getWeatherData };
