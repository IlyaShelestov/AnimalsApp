const express = require("express");
const catsAPIController = require("../controllers/catsAPIController.js");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let fact = await catsAPIController.getFactData();
    let image = await catsAPIController.getImageData();
    res.render("cats", { fact: fact, image: image, checked: "" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching weather data");
  }
});

router.post("/", async (req, res) => {
  try {
    let fact = await catsAPIController.getFactData();
    let image = "";
    if ("breed" in req.body) {
      image = await catsAPIController.getImageData(true);
      res.render("cats", { fact: fact, image: image, checked: "checked" });
    } else {
      image = await catsAPIController.getImageData(false);
      res.render("cats", { fact: fact, image: image, checked: "" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching weather data");
  }
});

module.exports = router;
