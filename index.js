const express = require("express");
const app = express();
import bot from "./bot.js"



app.get("/", (req, res) => {
  res.status(200).json({ message: "working" });
});
const start = async () => {
  try {
    app.listen(8080, () => console.log("start", 8080));
    bot()
  } catch (e) {
    console.log(e);
  }
};

start();

