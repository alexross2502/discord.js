const { Client, GatewayIntentBits } = require("discord.js");
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

async function bot() {
  await client.login(process.env.BOT_TOKEN);
  async function doSomething() {
    const serverID = "1177938443725176942";
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
  //   setInterval(async () => {
  //     await doSomething();
  //   }, 10000);
  doSomething();
}

module.exports = bot;
