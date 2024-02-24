const mongoose = require("mongoose");
const { formatDate } = require("../helpers");

const itemSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    title_ru: { type: String, required: true },
    title_en: { type: String, required: true },
    description_ru: { type: String, required: true },
    description_en: { type: String, required: true },
    image_1: { type: String, required: true },
    image_2: { type: String, required: true },
    image_3: { type: String, required: true },
    creation_date: { type: Date, default: Date.now },
    update_date: { type: Date, default: Date.now },
    deletion_date: Date,
  },
  { collection: "blogData" }
);

const Item = mongoose.model("Item", itemSchema);

async function insert(
  title_ru,
  title_en,
  description_ru,
  description_en,
  image_1,
  image_2,
  image_3
) {
  try {
    const items = await Item.find().sort({ id: -1 }).limit(1);

    if (items.length > 0) {
      maxId = items[0].id;
    } else {
      maxId = -1;
    }

    const newItem = new Item({
      id: maxId + 1,
      title_ru: title_ru,
      title_en: title_en,
      description_ru: description_ru,
      description_en: description_en,
      image_1: image_1,
      image_2: image_2,
      image_3: image_3,
    });

    await newItem.save();
  } catch (error) {
    console.error("Error inserting item in MongoDB", error);
  }
}

async function getAllConverted() {
  try {
    let items = await Item.find({});

    items = items.map((item) => {
      let itemObj = item.toObject();

      let creation_date = formatDate(itemObj.creation_date);
      let update_date = formatDate(itemObj.update_date);

      itemObj.creation_date = creation_date;
      itemObj.update_date = update_date;

      if (itemObj.deletion_date) {
        let deletion_date = formatDate(itemObj.deletion_date);
        itemObj.deletion_date = deletion_date;
      }

      return itemObj;
    });

    return items;
  } catch (error) {
    console.log("Error retrieving items in MongoDB", error);
  }
}

async function updateById(
  id,
  title_ru,
  title_en,
  description_ru,
  description_en,
  image_1,
  image_2,
  image_3
) {
  try {
    const updateData = {};
    if (title_ru) updateData.title_ru = title_ru;
    if (title_en) updateData.title_en = title_en;
    if (description_ru) updateData.description_ru = description_ru;
    if (description_en) updateData.description_en = description_en;
    if (image_1) updateData.image_1 = image_1;
    if (image_2) updateData.image_2 = image_2;
    if (image_3) updateData.image_3 = image_3;
    updateData.update_date = new Date();

    await Item.findOneAndUpdate({ id: id }, updateData, { new: true });
  } catch (error) {
    console.error("Error updating item in MongoDB", error);
  }
}

async function deleteById(id) {
  try {
    await Item.findOneAndUpdate({ id: id }, { deletion_date: new Date() });
  } catch (error) {
    console.error("Error deleting item in MongoDB", error);
  }
}

async function restoreById(id) {
  try {
    await Item.findOneAndUpdate(
      { id: id },
      { $unset: { deletion_date: 1 } },
      { new: true }
    );
  } catch (error) {
    console.error("Error restoring item in MongoDB", error);
  }
}

module.exports = {
  insert,
  getAllConverted,
  updateById,
  deleteById,
  restoreById,
};
