const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.clearCookie("isLoggedIn");
  res.clearCookie("isAdmin");
  res.clearCookie("username");
  res.redirect("/login");
});

module.exports = router;
