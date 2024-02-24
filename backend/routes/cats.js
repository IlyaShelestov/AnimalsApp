const express = require("express");
const catsAPIController = require("../controllers/catsAPIController.js");
const catsDB = require("../database/cats.js");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let fact = await catsAPIController.getFactData();
    let image = await catsAPIController.getImageData(false);
    await catsDB.insert(image, fact, false, req.signedCookies.username);
    let catsData = await catsDB.getLast();
    res.render("cats", {
      fact: catsData.fact,
      image: catsData.image_url,
      checked: "",
      isLoggedIn: req.signedCookies.isLoggedIn,
      isAdmin: req.signedCookies.isAdmin,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching cats data");
  }
});

router.post("/", async (req, res) => {
  try {
    let fact = await catsAPIController.getFactData();
    let image = "";
    if ("breed" in req.body) {
      image = await catsAPIController.getImageData(true);
      await catsDB.insert(image, fact, true, req.signedCookies.username);
      let catsData = await catsDB.getLast();
      res.render("cats", {
        fact: catsData.fact,
        image: catsData.image_url,
        checked: "checked",
        isLoggedIn: req.signedCookies.isLoggedIn,
        isAdmin: req.signedCookies.isAdmin,
      });
    } else {
      res.redirect("/cats");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching cats data");
  }
});

module.exports = router;
