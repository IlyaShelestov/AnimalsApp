const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("admin", {
    isLoggedIn: req.cookies.isLoggedIn,
    isAdmin: req.cookies.isAdmin,
  });
});

module.exports = router;
