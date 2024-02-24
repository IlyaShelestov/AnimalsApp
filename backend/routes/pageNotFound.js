const express = require("express");
const router = express.Router();

router.all("*", (req, res) => {
  res.status(404).render("pageNotFound", {
    isLoggedIn: req.signedCookies.isLoggedIn,
    isAdmin: req.signedCookies.isAdmin,
  });
});

module.exports = router;
