const express = require("express");
const catsAPIController = require("../controllers/catsAPIController.js");
const router = express.Router();

router.get("/cats", async (req, res) => {
  try {
    let fact = await catsAPIController.getFactData();
    let image = await catsAPIController.getImageData();
    res.render("cats", { fact: fact, image: image });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching weather data");
  }
});

router.post("/cats", async (req, res) => {
  try {
    let fact = await catsAPIController.getFactData();
    let image = await catsAPIController.getImageData();
    res.render("cats", { fact: fact, image: image });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching weather data");
  }
});

module.exports = router;
