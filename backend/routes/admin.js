const express = require("express");
const usersDB = require("../database/users.js");
const weatherDB = require("../database/weather.js");
const catsDB = require("../database/cats.js");
const dictionaryDB = require("../database/dictionary.js");
const router = express.Router();

router.get("/", async (req, res) => {
  const users = await usersDB.getAllConverted();
  res.render("admin", {
    isLoggedIn: req.signedCookies.isLoggedIn,
    isAdmin: req.signedCookies.isAdmin,
    users,
  });
});

router.get("/weather", async (req, res) => {
  const weatherData = await weatherDB.getAllConverted();

  res.render("admin_weather", {
    isLoggedIn: req.signedCookies.isLoggedIn,
    isAdmin: req.signedCookies.isAdmin,
    weatherData,
  });
});

router.get("/cats", async (req, res) => {
  const catsData = await catsDB.getAllConverted();

  res.render("admin_cats", {
    isLoggedIn: req.signedCookies.isLoggedIn,
    isAdmin: req.signedCookies.isAdmin,
    catsData,
  });
});

router.get("/dictionary", async (req, res) => {
  const dictionaryData = await dictionaryDB.getAllConverted();

  res.render("admin_dictionary", {
    isLoggedIn: req.signedCookies.isLoggedIn,
    isAdmin: req.signedCookies.isAdmin,
    dictionaryData,
  });
});

router.post("/", async (req, res) => {
  const { _method, id, username, password, admin } = req.body;

  switch (_method) {
    case "CREATE":
      await usersDB.insert(username, password, !!admin);
      break;
    case "UPDATE":
      await usersDB.updateById(id, username, password, !!admin);
      break;
    case "DELETE":
      await usersDB.deleteById(id);
      break;
    case "RESTORE":
      await usersDB.restoreById(id);
      break;
    default:
      break;
  }

  res.redirect("/admin");
});

module.exports = router;
