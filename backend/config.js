const config = {
  server: {
    port: 3000,
  },
  database: {
    uri: "mongodb+srv://shelestov2905:p0cbZHri5qle3S6H@cluster0.qn3unxy.mongodb.net/APIapp?retryWrites=true&w=majority",
    options: {
      serverApi: { version: "1", strict: true, deprecationErrors: true },
    },
  },
  openWeatherMap: {
    apiKey: "a74f4f70fc9d2022ca81fef09f90f1a6",
    apiUrl: "https://api.openweathermap.org/data/2.5/weather",
  },
  cats: {
    apiKey:
      "live_nFcPUp4DAv2oFcDqgx2WM5uQ1s2uccRJZEJq5zG8f7dHHAiCSrOywIwpXne3iJCg",
    imagesUrl: "https://api.thecatapi.com/v1/images/search",
    factsUrl: "https://meowfacts.herokuapp.com/",
  },
  dogs: {
    apiUrl: "https://random.dog/woof.json",
  },
};

module.exports = config;
