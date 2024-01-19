const express = require("express");
const weatherAPIController = require("../controllers/weatherAPIController.js")
const router = express.Router();

router.get("/weather", (req, res) => {
  res.render("weather", { city: "Astana" });
});

router.post("/weather", async (req, res) => {
  try {
    let city = req.body.city;
    let weatherData = await weatherAPIController.getWeatherData(city);
    console.log(weatherData) + "qwewewer";
    res.render("weather", { city: weatherData.humidity });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching weather data");
  }
});

module.exports = router;