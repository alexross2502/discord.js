const express = require("express");
const app = express();




const start = async () => {
  try {
    app.listen(8080, () => console.log("start", 8080));
  } catch (e) {
    console.log(e);
  }
};

start();

