const express = require("express");
const usersDB = require("../database/users.js");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("signup", {
    wrong: false,
    isLoggedIn: req.signedCookies.isLoggedIn,
    isAdmin: req.signedCookies.isAdmin,
  });
});

router.post("/", async (req, res) => {
  const username = req.body.username;
  const user = await usersDB.exists(username).catch(console.dir);
  if (user != false) {
    res.render("signup", {
      wrong: true,
      isLoggedIn: req.signedCookies.isLoggedIn,
      isAdmin: req.signedCookies.isAdmin,
    });
  } else {
    const password = req.body.password;
    usersDB.insert(username, password, false);
    res.redirect("/login");
  }
});

module.exports = router;
