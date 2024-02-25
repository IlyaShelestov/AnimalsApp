const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", {
    isLoggedIn: req.signedCookies.isLoggedIn,
    isAdmin: req.signedCookies.isAdmin,
    language: req.signedCookies.language,
  });
});

module.exports = router;
