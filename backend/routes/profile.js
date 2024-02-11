const express = require("express");
const weatherDB = require("../database/weather.js");
const catsDB = require("../database/cats.js");
const dictionaryDB = require("../database/dictionary.js");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("profile", {
    isLoggedIn: req.cookies.isLoggedIn,
    isAdmin: req.cookies.isAdmin,
    username: req.cookies.username,
    show: "",
  });
});

router.post("/", async (req, res) => {
  const _type = req.body._type;
  let data;
  switch (_type) {
    case "weather":
      data = await weatherDB.getAllConverted(req.cookies.username);
      break;
    case "cats":
      data = await catsDB.getAllConverted(req.cookies.username);
      break;
    case "dictionary":
      data = await dictionaryDB.getAllConverted(req.cookies.username);
      break;
    default:
      break;
  }
  
  res.render("profile", {
    isLoggedIn: req.cookies.isLoggedIn,
    isAdmin: req.cookies.isAdmin,
    username: req.cookies.username,
    show: _type,
    data,
  });
});

module.exports = router;
