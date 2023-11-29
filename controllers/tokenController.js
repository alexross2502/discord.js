const { Client, GatewayIntentBits } = require("discord.js");
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

    await doSomething("111");
    setTimeout(async () => {
      await doSomething("444");
    }, 2000 * 60);
    setTimeout(async () => {
      await doSomething("555");
    }, 4000 * 60);

    res.status(200).json("ok").end();
  } catch (e) {
    res.status(401).json({ message: e.message }).end();
  }
}

module.exports = { check };
