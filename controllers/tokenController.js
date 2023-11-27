const { Client, GatewayIntentBits } = require("discord.js");
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

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
    doSomething();
    scheduleTask(3, 20, () => {
      doSomething();
    });
    scheduleTask(3, 21, () => {
      doSomething();
    });

    res.status(200).json("ok").end();
  } catch (e) {
    res.status(401).json({ message: e.message }).end();
  }
}

module.exports = { check };
