const express = require("express");
const weatherDB = require("../database/weather.js");
const catsDB = require("../database/cats.js");
const dogsDB = require("../database/dogs.js");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("profile", {
    isLoggedIn: req.signedCookies.isLoggedIn,
    isAdmin: req.signedCookies.isAdmin,
    username: req.signedCookies.username,
    show: "",
  });
});

router.post("/", async (req, res) => {
  const _type = req.body._type;
  let data;
  switch (_type) {
    case "weather":
      data = await weatherDB.getAllConverted(req.signedCookies.username);
      break;
    case "cats":
      data = await catsDB.getAllConverted(req.signedCookies.username);
      break;
    case "dogs":
      data = await dogsDB.getAllConverted(req.signedCookies.username);
      break;
    default:
      break;
  }

  res.render("profile", {
    isLoggedIn: req.signedCookies.isLoggedIn,
    isAdmin: req.signedCookies.isAdmin,
    username: req.signedCookies.username,
    show: _type,
    data,
  });
});

module.exports = router;
