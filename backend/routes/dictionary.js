const express = require("express");
const dictionaryAPIController = require("../controllers/dictionaryAPIController.js");
const dictionaryDB = require("../database/dictionary.js");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let wordData = await dictionaryAPIController.getWordData("hello");
    await dictionaryDB.insert(wordData, req.cookies.username);
    wordData = await dictionaryDB.getLast();
    res.render("dictionary", {
      wordData,
      isLoggedIn: req.cookies.isLoggedIn,
      isAdmin: req.cookies.isAdmin,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching dictionary data");
  }
});

router.post("/", async (req, res) => {
  try {
    const word = req.body.word;
    let wordData = await dictionaryAPIController.getWordData(word);
    if (wordData.code == "404") {
      res.render("dictionary", {
        wordData,
        isLoggedIn: req.cookies.isLoggedIn,
        isAdmin: req.cookies.isAdmin,
      });
    } else {
      await dictionaryDB.insert(wordData, req.cookies.username);
      wordData = await dictionaryDB.getLast();
      res.render("dictionary", {
        wordData,
        isLoggedIn: req.cookies.isLoggedIn,
        isAdmin: req.cookies.isAdmin,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching dictionary data");
  }
});

module.exports = router;
