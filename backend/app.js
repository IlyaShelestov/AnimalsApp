const express = require("express");
const config = require("./config.js");
const path = require("path");

const homeRoute = require("./routes/home.js");
const weatherRoute = require("./routes/weather.js");

const app = express();
const port = config.server.port;

app.use(express.static(path.join(__dirname, "..", "frontend", "static")));

app.use("/", homeRoute, weatherRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
