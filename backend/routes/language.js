const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const language = req.query.lang;
  res.cookie("language", language, { httpOnly: true, signed: true });
  res.redirect("back");
});

module.exports = router;
