const { Client, GatewayIntentBits, bold } = require("discord.js");
const events = require("./events");
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

async function check(req, res) {
  try {
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
              firstText = bold(firstText);
              await targetChannel.send(`${firstText}: ${secondText}`);
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
      if (currentDayOfWeek != 0) {
        /////все, кроме воскресенья
        const keys = Object.keys(events);
        for (let i = 0; i < keys.length; i++) {
          let key = keys[i];
          eventTime = +key.split(".")[1] * 60 + +key.split(".")[2];

          let currentTime = currentHours * 60 + +currentMinutes;

          let delta = eventTime - currentTime;
          let eventDetails = events[key];

          if (delta >= -2 && delta <= 2) {
            let firstText = eventDetails.event;
            let open =
              eventDetails.open.split(":")[0] * 60 +
              +eventDetails.open.split(":")[1];
            let openDelta = open - currentTime;
            let start =
              eventDetails.start.split(":")[0] * 60 +
              +eventDetails.start.split(":")[1];
            let startDelta = start - currentTime;
            let secondText = `Открытие через ${openDelta} минут, старт через ${startDelta} минут`;
            await doSomething(firstText, secondText);
            console.log(firstText, secondText);
            //KD night: Открытие через 4 минут, старт через 5 минут
          }
        }
      }
    }
    timeChecker();

    res.status(200).json("ok").end();
  } catch (e) {
    res.status(401).json({ message: e.message }).end();
  }
}

module.exports = { check };
