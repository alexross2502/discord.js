const TelegramBot = require("node-telegram-bot-api");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");

app.use(express.json());
app.get("/", (req, res) => {
  res.status(200).json({ message: "working" });
});

const start = async () => {
  try {
    const bot = new TelegramBot(process.env.API_KEY_BOT, {
      polling: {
        interval: 300,
        autoStart: true,
      },
    });

    bot.onText(/\/start/, async (msg) => {
      const userId = msg.chat.username;
      if (userId != undefined) {
        await bot.sendMessage("484934360", `@${userId}`);
      } else {
        await bot.sendMessage(
          msg.chat.id,
          "К сожалению, у Вас не указан username. Отправьте любое сообщение в бот и ожидайте несколько секунд"
        );
      }
    });

    bot.onText(/^(?!\/)/, (msg) => {
      bot.forwardMessage("484934360", msg.chat.id, msg.message_id);
    });

    app.listen(PORT, () => console.log("Server started on port", PORT));
  } catch (e) {
    console.error(e);
  }
};

start();
