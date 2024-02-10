const express = require("express");
const router = express.Router();

router.all("*", (req, res) => {
  res
    .status(404)
    .render("pageNotFound", {
      isLoggedIn: req.cookies.isLoggedIn,
      isAdmin: req.cookies.isAdmin,
    });
});

module.exports = router;
