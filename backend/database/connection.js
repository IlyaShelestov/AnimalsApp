const mongoose = require("mongoose");
const config = require("../config.js");

const connectDB = async () => {
  try {
    await mongoose.connect(config.database.uri, config.database.options);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Could not connect to MongoDB", err);
    process.exit(1);
  }
};

const closeDB = () => {
  mongoose.disconnect();
  console.log("Mongoose connection disconnected");
};

module.exports = { connectDB, closeDB };
