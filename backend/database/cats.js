const mongoose = require("mongoose");
const { formatDate } = require("../helpers");

const catsDataSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    creation_date: { type: Date, default: Date.now },
    username: { type: String, required: true },
    image_url: { type: String, required: true },
    fact: { type: String, required: true },
    hasBreed: { type: Boolean, default: false, required: true },
  },
  { collection: "catsData" }
);

const CatsData = mongoose.model("CatsData", catsDataSchema);

async function insert(image_url, fact, hasBreed, username) {
  try {
    const data = await CatsData.find().sort({ id: -1 }).limit(1);

    if (data.length > 0) {
      maxId = data[0].id;
    } else {
      maxId = -1;
    }

    const newData = new CatsData({
      id: maxId + 1,
      username: username,
      image_url: image_url,
      fact: fact,
      hasBreed: hasBreed,
    });

    await newData.save();
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
  }
}

async function getAllConverted(username) {
  try {
    let docs;
    if (username) {
      docs = await CatsData.find({ username: username });
    } else {
      docs = await CatsData.find({});
    }

    docs = docs.map((doc) => {
      let docObj = doc.toObject();

      let creation_date = formatDate(docObj.creation_date);

      docObj.creation_date = creation_date;

      return docObj;
    });

    return docs;
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
  }
}

async function getLast() {
  try {
    const datas = await CatsData.find().sort({ creation_date: -1 }).limit(1);

    const data = datas[0];

    return data;
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
  }
}

module.exports = { insert, getLast, getAllConverted };
