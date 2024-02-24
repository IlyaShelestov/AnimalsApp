const express = require("express");
const usersDB = require("../database/users.js");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("login", {
    deleted: false,
    wrong: false,
    isLoggedIn: req.signedCookies.isLoggedIn,
    isAdmin: req.signedCookies.isAdmin,
  });
});

router.post("/", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const user = await usersDB.exists(username, password).catch(console.dir);
  if (user != false) {
    if (user.deletion_date) {
      res.render("login", {
        deleted: true,
        wrong: false,
        isLoggedIn: req.signedCookies.isLoggedIn,
        isAdmin: req.signedCookies.isAdmin,
      });
      return;
    }
    const isAdmin = user.admin;
    const username = user.username;
    res.cookie("isLoggedIn", true, { httpOnly: true, signed: true });
    res.cookie("username", username, { httpOnly: true, signed: true });
    if (isAdmin) {
      res.cookie("isAdmin", true, { httpOnly: true, signed: true });
    }
    res.redirect("/");
  } else {
    res.render("login", {
      deleted: false,
      wrong: true,
      isLoggedIn: req.signedCookies.isLoggedIn,
      isAdmin: req.signedCookies.isAdmin,
    });
  }
});

module.exports = router;
