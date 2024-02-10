const express = require("express");
const catsAPIController = require("../controllers/catsAPIController.js");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let fact = await catsAPIController.getFactData();
    let image = await catsAPIController.getImageData(false);
    res.render("cats", {
      fact: fact,
      image: image,
      checked: "",
      isLoggedIn: req.cookies.isLoggedIn,
      isAdmin: req.cookies.isAdmin,
    });
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
      res.render("cats", {
        fact: fact,
        image: image,
        checked: "checked",
        isLoggedIn: req.cookies.isLoggedIn,
        isAdmin: req.cookies.isAdmin,
      });
    } else {
      res.redirect("/cats");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching weather data");
  }
});

module.exports = router;
