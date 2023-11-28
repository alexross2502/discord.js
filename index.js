const express = require("express");
const app = express();
const PORT = process.env.PORT || 3306;
const cors = require("cors");
const dotenv = require("dotenv");
const router = require("./routes");
const {
  Client,
  GatewayIntentBits,
  MessageEmbed,
  bold,
  inlineCode,
} = require("discord.js");
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});
dotenv.config();
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
///////////////////////////////////////////////

///////////////////////////

const start = async () => {
  try {
    app.listen(PORT, () => console.log("start", PORT));
    // await doSomething("dsadsadas", "234124");
  } catch (e) {
    console.log(e);
  }
};

start();
