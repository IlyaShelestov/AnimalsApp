const express = require("express");
const weatherAPIController = require("../controllers/weatherAPIController.js");
const weatherDB = require("../database/weather.js");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let weatherData = await weatherAPIController.getWeatherData("Astana");
    await weatherDB.insert(weatherData, "Astana", req.signedCookies.username);
    weatherData = await weatherDB.getLast();
    res.render("weather", {
      weatherData,
      city: "Astana",
      isLoggedIn: req.signedCookies.isLoggedIn,
      isAdmin: req.signedCookies.isAdmin,
    });
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
      res.redirect("/weather");
    } else {
      await weatherDB.insert(weatherData, city, req.signedCookies.username);
      weatherData = await weatherDB.getLast();
      res.render("weather", {
        weatherData,
        city: city,
        isLoggedIn: req.signedCookies.isLoggedIn,
        isAdmin: req.signedCookies.isAdmin,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching weather data");
  }
});

module.exports = router;
