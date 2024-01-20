const express = require("express");
const config = require("./config.js");
const path = require("path");

const homeRoute = require("./routes/home.js");
const weatherRoute = require("./routes/weather.js");
const catsRoute = require("./routes/cats.js");

const app = express();
const port = config.server.port;

app.set("view engine", "ejs");
app.set("views", "frontend/views");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "..", "frontend", "css")));

app.use("/", homeRoute, weatherRoute, catsRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
