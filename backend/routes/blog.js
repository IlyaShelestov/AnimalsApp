const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("blog", {
    isLoggedIn: req.signedCookies.isLoggedIn,
    isAdmin: req.signedCookies.isAdmin,
  });
});

module.exports = router;
