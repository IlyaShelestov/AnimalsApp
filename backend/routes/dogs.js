const express = require("express");
const dogsAPIController = require("../controllers/dogsAPIController.js");
const dogsDB = require("../database/dogs.js");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let dogData = await dogsAPIController.getImageData();
    await dogsDB.insert(dogData, req.signedCookies.username);
    dogData = await dogsDB.getLast();
    res.render("dogs", {
      image: dogData.image_url,
      isLoggedIn: req.signedCookies.isLoggedIn,
      isAdmin: req.signedCookies.isAdmin,
      language: req.signedCookies.language,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching dogs data");
  }
});

router.post("/", async (req, res) => {
  res.redirect("/dogs");
});

module.exports = router;
