const { Client, GatewayIntentBits, Events } = require('discord.js');
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
  ],
});


/*client.on('ready', () => {
  console.log(`Бот запущен как ${client.user.tag}`);

  
  

  
});*/

function doSomething() {
  const serverID = process.env.SERVER_ID
  const server = client.guilds.cache.get(serverID);
  if (server) {
    server.channels.fetch().then(channels => {
      // Выберите канал, в который бот будет отправлять сообщение
      const targetChannel = channels.find(channel => channel.name === 'test');

      // Если канал найден, отправьте сообщение
      if (targetChannel) {
        targetChannel.send('Привет! Я бот и я только что присоединился к серверу!');
      } else {
        console.error('Не удалось найти текстовый канал.');
      }
    }).catch(error => {
      console.error('Ошибка при получении каналов сервера:', error);
    });
  } else {
    console.error(`Сервер с ID ${serverId} не найден.`);
  }
}

function scheduleTask(hour, minute, callback) {
  const now = new Date();
  const scheduledTime = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    hour,
    minute,
    0,
    0
  );

  let timeUntilScheduled = scheduledTime - now;
  if (timeUntilScheduled < 0) {
    timeUntilScheduled += 24 * 60 * 60 * 1000; // Если время уже прошло сегодня, переносим на следующий день
  }

  setTimeout(() => {
    callback();
    setInterval(callback, 24 * 60 * 60 * 1000); // Повторяем каждые 24 часа
  }, timeUntilScheduled);
}

// Пример использования:
scheduleTask(1, 11, () => {
  doSomething()
});

scheduleTask(1, 12, () => {
  doSomething()
});

client.login(process.env.BOT_TOKEN)
