const express = require("express");
const app = express();
const PORT = process.env.PORT || 3306;
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const router = require("./routes");

dotenv.config();

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}?retryWrites=true&w=majority`
  )
  .then(() => console.log("connected to db"))
  .catch((err) => console.log(`db connection error: ${err}`));

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api", router);

app.get("/", (req, res) => {
  res.status(200).json({ message: "working" });
});

const start = async () => {
  try {
    app.listen(PORT, () => console.log("start", PORT));
  } catch (e) {
    console.log(e);
  }
};

start();
