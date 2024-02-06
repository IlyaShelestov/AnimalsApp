const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    creation_date: { type: Date, default: Date.now },
    update_date: { type: Date, default: Date.now },
    deletion_date: Date,
    admin: { type: Boolean, default: false },
  },
  { collection: "users" }
);

const User = mongoose.model("User", userSchema);

async function insert(username, password, admin) {
  try {
    const users = await User.find().sort({ id: -1 }).limit(1);

    if (users.length > 0) {
      maxId = users[0].id;
    }

    const newUser = new User({
      id: maxId + 1,
      username: username,
      password: password,
      admin: admin,
    });

    await newUser.save();

  } catch (error) {
    console.error("Error connecting to MongoDB", error);
  }
}

async function exists(username, password) {
  try {
    const doesExist = await User.exists({username: username, password: password});
    return doesExist;
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
  }
}

module.exports = { exists, insert };
