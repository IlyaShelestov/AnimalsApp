const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");

const config = require("./config.js");
const db = require("./database/connection.js");
const middleware = require("./middleware.js");

const homeRoute = require("./routes/home.js");
const profileRoute = require("./routes/profile.js");
const weatherRoute = require("./routes/weather.js");
const catsRoute = require("./routes/cats.js");
const dictionaryRoute = require("./routes/dictionary.js");
const loginRoute = require("./routes/login.js");
const signupRoute = require("./routes/signup.js");
const logoutRoute = require("./routes/logout.js");
const adminRoute = require("./routes/admin.js");
const pageNotFoundRoute = require("./routes/pageNotFound.js");

const app = express();
const port = config.server.port;

db.connectDB();

app.set("view engine", "ejs");
app.set("views", "frontend/views");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "..", "frontend", "css")));

app.use(cookieParser());

app.use("/dictionary", middleware.checkAuth, dictionaryRoute);
app.use("/weather", middleware.checkAuth, weatherRoute);
app.use("/cats", middleware.checkAuth, catsRoute);
app.use("/profile", middleware.checkAuth, profileRoute);
app.use("/admin", middleware.checkAuth, middleware.checkAdmin, adminRoute);
app.use("/login", middleware.redirectIfLoggedIn, loginRoute);
app.use("/signup", middleware.redirectIfLoggedIn, signupRoute);
app.use("/logout", middleware.checkAuth, logoutRoute);
app.use("/", homeRoute, pageNotFoundRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

process.on("SIGINT", () => {
  db.closeDB();
  process.exit(0);
});
