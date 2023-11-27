const express = require("express");
const app = express();
const PORT = process.env.PORT || 3306;
const cors = require("cors");
const bot = require("./bot.js");
const { Client, GatewayIntentBits } = require("discord.js");
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});
const mongoose = require("mongoose");
const router = require("./routes");
const dotenv = require("dotenv");
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
    check();
  } catch (e) {
    console.log(e);
  }
};

async function check() {
  try {
    console.log(process.env.BOT_TOKEN);
    await client.login(process.env.BOT_TOKEN);

    async function doSomething() {
      const serverID = "1177898865773531156";
      const server = await client.guilds.cache.get(serverID);
      if (server) {
        server.channels
          .fetch()
          .then(async (channels) => {
            const targetChannel = await channels.find(
              (channel) => channel.name === "test"
            );
            if (targetChannel) {
              await targetChannel.send(
                "Привет! Я бот и я только что присоединился к серверу!"
              );
            } else {
              console.error("Не удалось найти текстовый канал.");
            }
          })
          .catch((error) => {
            console.error("Ошибка при получении каналов сервера:", error);
          });
      } else {
        console.error(`Сервер с ID ${serverID} не найден.`);
      }
    }
    function scheduleTask(hour, minute, callback) {
      // ... ваша функция
    }
    // Пример использования:
    setInterval(async () => {
      await doSomething();
    }, 2000);
    scheduleTask(3, 20, () => {
      doSomething();
    });
    scheduleTask(3, 21, () => {
      doSomething();
    });
  } catch (e) {}
}

start();
