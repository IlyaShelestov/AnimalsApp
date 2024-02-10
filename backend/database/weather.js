const mongoose = require("mongoose");
const { formatDate } = require("../helpers");

const weatherDataSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    creation_date: { type: Date, default: Date.now },
    username: { type: String, required: true },
    code: { type: Number, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    lat: { type: Number, required: true },
    lon: { type: Number, required: true },
    main: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true },
    feels_like: { type: Number, required: true },
    temperature: { type: Number, required: true },
    pressure: { type: Number, required: true },
    humidity: { type: Number, required: true },
    wind: { type: Number, required: true },
  },
  { collection: "weatherData" }
);

const Data = mongoose.model("Data", weatherDataSchema);

async function insert(weatherData, city, username) {
  try {
    const data = await Data.find().sort({ id: -1 }).limit(1);

    if (data.length > 0) {
      maxId = data[0].id;
    } else {
      maxId = -1;
    }

    const newData = new Data({
      id: maxId + 1,
      code: weatherData.code,
      username: username,
      city: city,
      country: weatherData.country,
      lat: weatherData.lat,
      lon: weatherData.lon,
      main: weatherData.main,
      description: weatherData.description,
      icon: weatherData.icon,
      feels_like: weatherData.feels_like,
      temperature: weatherData.temperature,
      pressure: weatherData.pressure,
      humidity: weatherData.humidity,
      wind: weatherData.wind,
    });

    await newData.save();
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
  }
}

async function getAllConverted() {
  try {
    let docs = await Data.find({});

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
    const datas = await Data.find().sort({ creation_date: -1 }).limit(1);

    const data = datas[0];

    return data;
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
  }
}

module.exports = { insert, getLast, getAllConverted };
