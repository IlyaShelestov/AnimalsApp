const express = require("express");
const weatherAPIController = require("../controllers/weatherAPIController.js");
const router = express.Router();

router.get("/weather", async (req, res) => {
  try {
    let weatherData = await weatherAPIController.getWeatherData("Astana");
    res.render("weather", { weatherData, city: "Astana" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching weather data");
  }
});

router.post("/weather", async (req, res) => {
  try {
    let city = req.body.city;
    let weatherData = await weatherAPIController.getWeatherData(city);
    res.render("weather", { weatherData, city: city });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching weather data");
  }
});

module.exports = router;
