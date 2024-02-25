const express = require("express");
const blogDB = require("../database/blog.js");
const router = express.Router();

router.get("/", async (req, res) => {
  const items = await blogDB.getAllConverted();

  res.render("blog", {
    isLoggedIn: req.signedCookies.isLoggedIn,
    isAdmin: req.signedCookies.isAdmin,
    items,
  });
});

module.exports = router;
