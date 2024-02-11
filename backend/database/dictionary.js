const mongoose = require("mongoose");
const { formatDate } = require("../helpers");

const dictionaryDataSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    creation_date: { type: Date, default: Date.now },
    username: { type: String, required: true },
    code: { type: Number, required: true },
    word: { type: String, required: true },
    phonetic: { type: String },
    partOfSpeech: { type: String, required: true },
    definition: { type: String, required: true },
  },
  { collection: "dictionaryData" }
);

const DictionaryData = mongoose.model("DictionaryData", dictionaryDataSchema);

async function insert(wordData, username) {
  try {
    const data = await DictionaryData.find().sort({ id: -1 }).limit(1);

    if (data.length > 0) {
      maxId = data[0].id;
    } else {
      maxId = -1;
    }

    const newData = new DictionaryData({
      id: maxId + 1,
      username: username,
      code: wordData.code,
      word: wordData.word,
      phonetic: wordData.phonetic,
      partOfSpeech: wordData.partOfSpeech,
      definition: wordData.definition,
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
      docs = await DictionaryData.find({ username: username }).sort({
        creation_date: -1,
      });
    } else {
      docs = await DictionaryData.find({}).sort({ creation_date: -1 });
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
    const datas = await DictionaryData.find()
      .sort({ creation_date: -1 })
      .limit(1);

    const data = datas[0];

    return data;
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
  }
}

module.exports = { insert, getLast, getAllConverted };
