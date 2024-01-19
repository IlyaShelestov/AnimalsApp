const express = require("express");
const router = express.Router();

router.get("/weather", (req, res) => {
  res.render("weather", { city: "Astana" });
});

router.post("/weather", (req, res) => {
  let city = req.body.city;
  res.render("weather", { city });
});

module.exports = router;
