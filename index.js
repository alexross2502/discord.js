const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
  ],
});
console.log(process.env.BOT_TOKEN)
alert(process.env.BOT_TOKEN)
function doSomething() {
  const serverID = process.env.SERVER_ID;
  const server = client.guilds.cache.get(serverID);
  if (server) {
    server.channels.fetch().then(channels => {
      const targetChannel = channels.find(channel => channel.name === 'test');
      if (targetChannel) {
        targetChannel.send('Привет! Я бот и я только что присоединился к серверу!');
      } else {
        console.error('Не удалось найти текстовый канал.');
      }
    }).catch(error => {
      console.error('Ошибка при получении каналов сервера:', error);
    });
  } else {
    console.error(`Сервер с ID ${serverID} не найден.`);
  }
}

function scheduleTask(hour, minute, callback) {
  // ... ваша функция
}

// Пример использования:
scheduleTask(3, 20, () => {
  doSomething();
});

scheduleTask(3, 21, () => {
  doSomething();
});

client.login(process.env.BOT_TOKEN);
