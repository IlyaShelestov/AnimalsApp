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
    if (password) {
      const doesExist = await User.exists({
        username: username,
        password: password,
      });
      if (doesExist) {
        return User.findOne({ username: username });
      } else {
        return false;
      }
    } else {
      const doesExist = await User.exists({ username: username });
      if (doesExist) {
        return User.findOne({ username: username });
      } else {
        return false;
      }
    }
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
  }
}

async function getAllConverted() {
  try {
    let users = await User.find({});

    users = users.map((user) => {
      let userObj = user.toObject();

      let creation_date = formatDate(userObj.creation_date);
      let update_date = formatDate(userObj.update_date);

      userObj.creation_date = creation_date;
      userObj.update_date = update_date;

      if (userObj.deletion_date) {
        let deletion_date = formatDate(userObj.deletion_date);
        userObj.deletion_date = deletion_date;
      }

      return userObj;
    });

    return users;
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
  }
}

function formatDate(dateString) {
  const date = new Date(dateString);

  const pad = (num) => (num < 10 ? `0${num}` : num);

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  return `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;
}

async function updateById(id, username, password, admin) {
  try {
    const updateData = {};
    if (username) updateData.username = username;
    if (password) updateData.password = password;
    if (admin !== undefined) updateData.admin = admin;
    updateData.update_date = new Date();

    await User.findOneAndUpdate({ id: id }, updateData, { new: true });
  } catch (error) {
    console.error("Error updating user in MongoDB", error);
  }
}

async function deleteById(id) {
  try {
    await User.findOneAndUpdate({ id: id }, { deletion_date: new Date() });
  } catch (error) {
    console.error("Error deleting user in MongoDB", error);
  }
}

async function restoreById(id) {
  try {
    await User.findOneAndUpdate(
      { id: id },
      { $unset: { deletion_date: 1 } },
      { new: true }
    );
  } catch (error) {
    console.error("Error deleting user in MongoDB", error);
  }
}

module.exports = {
  exists,
  insert,
  getAllConverted,
  updateById,
  deleteById,
  restoreById,
};
