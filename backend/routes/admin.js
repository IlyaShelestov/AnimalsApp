const express = require("express");
const usersDB = require("../database/users.js");
const blogDB = require("../database/blog.js");
const weatherDB = require("../database/weather.js");
const catsDB = require("../database/cats.js");
const dogsDB = require("../database/dogs.js");
const router = express.Router();

router.get("/", async (req, res) => {
  const users = await usersDB.getAllConverted();
  res.render("admin", {
    isLoggedIn: req.signedCookies.isLoggedIn,
    isAdmin: req.signedCookies.isAdmin,
    language: req.signedCookies.language,
    users,
  });
});

router.get("/weather", async (req, res) => {
  const weatherData = await weatherDB.getAllConverted();

  res.render("admin_weather", {
    isLoggedIn: req.signedCookies.isLoggedIn,
    isAdmin: req.signedCookies.isAdmin,
    language: req.signedCookies.language,
    weatherData,
  });
});

router.get("/cats", async (req, res) => {
  const catsData = await catsDB.getAllConverted();

  res.render("admin_cats", {
    isLoggedIn: req.signedCookies.isLoggedIn,
    isAdmin: req.signedCookies.isAdmin,
    language: req.signedCookies.language,
    catsData,
  });
});

router.get("/dogs", async (req, res) => {
  const dogsData = await dogsDB.getAllConverted();

  res.render("admin_dogs", {
    isLoggedIn: req.signedCookies.isLoggedIn,
    isAdmin: req.signedCookies.isAdmin,
    language: req.signedCookies.language,
    dogsData,
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

router.get("/blog", async (req, res) => {
  const items = await blogDB.getAllConverted();

  res.render("admin_blog", {
    isLoggedIn: req.signedCookies.isLoggedIn,
    isAdmin: req.signedCookies.isAdmin,
    language: req.signedCookies.language,
    items,
  });
});

router.post("/blog", async (req, res) => {
  const {
    _method,
    id,
    title_ru,
    title_en,
    description_ru,
    description_en,
    image_1,
    image_2,
    image_3,
  } = req.body;

  switch (_method) {
    case "CREATE":
      await blogDB.insert(
        title_ru,
        title_en,
        description_ru,
        description_en,
        image_1,
        image_2,
        image_3
      );
      break;
    case "UPDATE":
      await blogDB.updateById(
        id,
        title_ru,
        title_en,
        description_ru,
        description_en,
        image_1,
        image_2,
        image_3
      );
      break;
    case "DELETE":
      await blogDB.deleteById(id);
      break;
    case "RESTORE":
      await blogDB.restoreById(id);
      break;
    default:
      break;
  }

  res.redirect("/admin/blog");
});

module.exports = router;
