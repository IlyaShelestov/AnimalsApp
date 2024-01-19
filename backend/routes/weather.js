const express = require("express");
const path = require("path");
const router = express.Router();

router.get("/weather", (req, res) => {
  res.render('weather', {city: 'Astana'});
});

router.post("/weather", (req, res) => {
  console.log(req.body);
  let city = req.body.city;
  res.render('weather', {city: city});
})

module.exports = router;
