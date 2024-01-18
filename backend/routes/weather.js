const express = require("express");
const path = require("path");
const router = express.Router();

router.get("/weather", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "..", "frontend", "pages", "weather.html")
  );
});

module.exports = router;
