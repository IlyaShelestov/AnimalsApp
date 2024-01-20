const express = require("express");
const router = express.Router();

router.get("/cats", async (req, res) => {
  try {
    // let weatherData = await weatherAPIController.getWeatherData("Astana");
    res.render("cats");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching weather data");
  }
});

router.post("/cats", async (req, res) => {
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

