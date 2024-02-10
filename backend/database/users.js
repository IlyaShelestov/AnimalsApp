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
    const users = await User.aggregate([
      {
        $project: {
          id: "$id",
          username: "$username",
          password: "$password",
          admin: "$admin",
          deletion_date: {
            $dateToString: {
              format: "%m/%d/%Y %H:%M:%S",
              date: "$deletion_date",
            },
          },
          creation_date: {
            $dateToString: {
              format: "%m/%d/%Y %H:%M:%S",
              date: "$creation_date",
            },
          },
          update_date: {
            $dateToString: {
              format: "%m/%d/%Y %H:%M:%S",
              date: "$update_date",
            },
          },
        },
      },
    ]);
    return users;
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
  }
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
