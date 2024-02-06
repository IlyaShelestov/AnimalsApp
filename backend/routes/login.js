const express = require("express");
const router = express.Router();

const users = require("../database/users.js");

router.get("/login", (req, res) => {
  res.render("login", { wrong: false });
});

router.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (await users.exists(username, password)) {
    res.redirect("/");
  } else {
    res.render("login", { wrong: true });
  }
});

module.exports = router;
