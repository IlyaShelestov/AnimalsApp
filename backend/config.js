const config = {
  server: {
    port: 3000,
  },
  openWeatherMap: {
    apiKey: "a74f4f70fc9d2022ca81fef09f90f1a6",
    apiUrl: "https://api.openweathermap.org/data/2.5/weather",
  },
  cats: {
    imagesUrl: "https://api.thecatapi.com/v1/images/search",
    factsUrl: "https://meowfacts.herokuapp.com/",
  },
};

module.exports = config;
