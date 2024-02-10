const express = require("express");
const usersDB = require("../database/users.js");
const router = express.Router();

router.get("/login", (req, res) => {
  res.render("login", { wrong: false });
});

router.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (await usersDB.exists(username, password).catch(console.dir)) {
    res.redirect("/");
  } else {
    res.render("login", { wrong: true });
  }
});

module.exports = router;
