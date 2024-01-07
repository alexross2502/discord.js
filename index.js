const { Client, GatewayIntentBits, bold, Events } = require("discord.js");
const events = require("./events");
const bossList = require("./boss2");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.AutoModerationConfiguration,
    GatewayIntentBits.MessageContent,
  ],
});
const keepAlive = require("./server.js");
const Users = require("./models/users.js");

///////////////////////db
async function dbDataFetch() {
  const data = await Users.find({});
  return data;
}
async function dbAdd(name, respawnInterval) {
  const newData = new Users({
    name: name,
    respawnInterval: respawnInterval,
    killedTime: null,
    nextRespawn: null,
  });
  newData
    .save()
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}
/////////////////////////
////////////////////////boss refresh
const updatePrefix = "/";
const addPrefix = "~";

client.on("messageCreate", async (message) => {
  ///////////////Добавление
  if (message.content.startsWith(addPrefix)) {
    const messageData = message.content.slice(1);
    const lastSpaceIndex = messageData.lastIndexOf(" ");
    const bossName = messageData.slice(0, lastSpaceIndex);
    const bossRespawnTime = messageData.slice(lastSpaceIndex + 1);
    const result = await dbAdd(bossName, bossRespawnTime);
    message.channel.send(`name : ${bossName} time: ${bossRespawnTime}`);
  }
  /////////////Обновление
  if (message.content.startsWith(updatePrefix)) {
    //message.channel.send('Hello, World!');
    const messageData = message.content.slice(1);
    const lastSpaceIndex = messageData.lastIndexOf(" ");
    let bossName = messageData.slice(0, lastSpaceIndex);
    let bossKilledTime = messageData.slice(lastSpaceIndex + 1);
    let dbData = await dbDataFetch();
    let boss = dbData.filter((el) => {
      return el.name == bossName;
    });
    if (boss[0] == undefined) {
      message.channel.send(
        `Босса с таким именем не найдено. Проверьте пробелы, большие/маленькие буквы`,
      );
      return false;
    }
    boss = boss[0];
    if (
      +bossKilledTime.split(":")[0] > 23 ||
      +bossKilledTime.split(":")[0] < 0 ||
      isNaN(bossKilledTime.split(":")[0]) ||
      +bossKilledTime.split(":")[1] > 59 ||
      +bossKilledTime.split(":")[1] < 0 ||
      isNaN(bossKilledTime.split(":")[1])
    ) {
      message.channel.send(
        `Неверный формат времени. Пример верного: 18:05, 1:15, 23:59, 0:23`,
      );
      return false;
    }
    let bossRespawnTime =
      +bossKilledTime.split(":")[0] * 60 +
      +bossKilledTime.split(":")[1] +
      +boss.respawnInterval;
    if (bossRespawnTime >= 1440) {
      bossRespawnTime = +bossRespawnTime - 1440;
    }
  }
});
///////////////

///////////////////////bossNotification
async function doSomethingBoss(firstText, secondText) {
  const serverID = process.env.SERVER_ID;
  const server = await client.guilds.cache.get(serverID);

  if (server) {
    server.channels
      .fetch()
      .then(async (channels) => {
        const targetChannel = await channels.find(
          (channel) => channel.name === "бот",
        );
        if (targetChannel) {
          firstText = bold(firstText);
          await targetChannel.send(`@everyone ${firstText}: ${secondText} `);
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
//////////////////////
async function doSomething(firstText, secondText) {
  const serverID = process.env.SERVER_ID;
  const server = await client.guilds.cache.get(serverID);

  if (server) {
    server.channels
      .fetch()
      .then(async (channels) => {
        const targetChannel = await channels.find(
          (channel) => channel.name === "бот",
        );
        if (targetChannel) {
          firstText = bold(firstText);
          await targetChannel.send(`${firstText}: ${secondText} `);
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
  let now = new Date();
  let currentDayOfWeek = now.getUTCDay(); // Воскресенье - 0, Понедельник - 1, ..., Суббота - 6
  let currentHours = +now.getUTCHours();
  if (currentHours == 22 || currentHours == 23) {
    currentHours = Math.abs(Math.abs(currentHours - 24) - 2);
  } else {
    currentHours = +currentHours + 2;
  }
  const currentMinutes = now.getUTCMinutes();

  const currentDate = `${currentDayOfWeek}.${currentHours}.${currentMinutes} `;
  //////////////boss
  let bosses = await dbDataFetch();
  bosses.forEach(async (el) => {
    let currentTime = currentHours * 60 + +currentMinutes;
    if (el.nextRespawn === null) {
      return;
    }
    if (currentTime >= 1430) {
      currentTime = currentTime - 1440;
    }
    if (el.nextRespawn - currentTime == 10) {
      await doSomethingBoss(el.name, "Появится через 10 минут");
      await Users.updateOne(
        { name: el.name },
        { killedTime: null, nextRespawn: null },
      );
    }
  });
  /////////////////////
  if (currentDayOfWeek != 10) {
    /////все, кроме воскресенья
    const keys = Object.keys(events);
    for (let i = 0; i < keys.length; i++) {
      let key = keys[i];
      eventTime = +key.split(".")[1] * 60 + +key.split(".")[2];

      let currentTime = currentHours * 60 + +currentMinutes;

      let delta = eventTime - currentTime;
      let eventDetails = events[key];

      if (delta == 0) {
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
      }
    }
  }
}

keepAlive();
client.login(process.env.BOT_TOKEN);
timeChecker();
setInterval(async () => {
  await timeChecker();
}, 1000 * 60);
