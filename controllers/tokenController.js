const { Client, GatewayIntentBits } = require("discord.js");
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

async function check(req, res) {
  try {
    function doSomething() {
      const serverID = "1177898865773531156";
      const server = client.guilds.cache.get(serverID);
      if (server) {
        server.channels
          .fetch()
          .then((channels) => {
            const targetChannel = channels.find(
              (channel) => channel.name === "test"
            );
            if (targetChannel) {
              targetChannel.send(
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
    client.login(
      "MTE3NzkwMTY5MzYxNTIxNDcxMw.GsUuyF.QF4ASzMl7q74iSui-nGheSEPqNpAVKtF9wxm_8"
    );
    res.status(200).json("ok").end();
  } catch (e) {
    res.status(401).json({ message: e.message }).end();
  }
}

module.exports = { check };
