const { Client, GatewayIntentBits } = require("discord.js");
const events = require("./events");
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

async function check(req, res) {
  try {
    console.log(process.env.BOT_TOKEN);
    await client.login(process.env.BOT_TOKEN);

    async function doSomething(firstText, secondText) {
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
              await targetChannel.send(`${firstText}`);
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

    async function timeChecker(dayOfWeek, hours, minutes) {
      const now = new Date();
      const currentDayOfWeek = now.getUTCDay(); // Воскресенье - 0, Понедельник - 1, ..., Суббота - 6
      const currentHours = +now.getUTCHours() + 2;
      const currentMinutes = now.getUTCMinutes();
      const currentDate = `${currentDayOfWeek}.${currentHours}.${currentMinutes}`;
      if (events.currentDate) {
        await doSomething(
          events.currentDate.firstText,
          events.currentDate.secondText
        );
      }
      console.log(currentDate);
    }

    await doSomething("111");

    res.status(200).json("ok").end();
  } catch (e) {
    res.status(401).json({ message: e.message }).end();
  }
}

module.exports = { check };
