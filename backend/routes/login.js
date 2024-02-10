const express = require("express");
const usersDB = require("../database/users.js");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("login", { wrong: false });
});

router.post("/", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const user = await usersDB.exists(username, password).catch(console.dir);
  if (user != false) {
    res.cookie("isLoggedIn", true, { httpOnly: true });
    res.cookie("isAdmin", user.admin, { httpOnly: true });
    res.redirect("/");
  } else {
    res.render("login", { wrong: true });
  }
});

module.exports = router;
