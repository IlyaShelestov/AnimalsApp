const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", {
    isLoggedIn: req.cookies.isLoggedIn,
    isAdmin: req.cookies.isAdmin,
  });
});

module.exports = router;
