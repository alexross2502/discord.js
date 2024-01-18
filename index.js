const TelegramBot = require("node-telegram-bot-api");
const bot = new TelegramBot(process.env.API_KEY_BOT, {
  polling: {
    interval: 300,
    autoStart: true,
  },
});
bot.on("polling_error", (err) => console.log(err.data.error.message));
bot.on("text", async (msg) => {
  console.log(msg);
});
