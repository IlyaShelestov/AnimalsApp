const express = require("express");
const weatherAPIController = require("../controllers/weatherAPIController.js");
const weatherDB = require("../database/weatherData.js");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let weatherData = await weatherAPIController.getWeatherData("Astana");
    await weatherDB.insert(weatherData, "Astana");
    weatherData = await weatherDB.getLast();
    res.render("weather", { weatherData, city: "Astana" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching weather data");
  }
});

router.post("/", async (req, res) => {
  try {
    let city = req.body.city;
    let weatherData = await weatherAPIController.getWeatherData(city);
    if (weatherData.code == "404") {
      weatherData = await weatherAPIController.getWeatherData("Astana");
      await weatherDB.insert(weatherData, "Astana");
      weatherData = await weatherDB.getLast();
      res.render("weather", {
        weatherData,
        city: "Astana (An invalid city name has been entered)",
      });
    } else {
      await weatherDB.insert(weatherData, city);
      weatherData = await weatherDB.getLast();
      res.render("weather", { weatherData, city: city });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching weather data");
  }
});

module.exports = router;
