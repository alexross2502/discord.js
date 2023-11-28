const {
  Client,
  GatewayIntentBits,
  MessageEmbed,
  bold,
  inlineCode,
} = require("discord.js");
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});
const keepAlive = require("./server.js");
//////////////////////////////////////////////////////
let ivents = {
  "1.0.0": { firstText: "Devil Square", secondText: "старт - 00:01" },
  "1.0.0": { firstText: "Devil Square", secondText: "старт - 00:01" },
  "1.0.0": { firstText: "Devil Square", secondText: "старт - 00:01" },
  "1.0.0": { firstText: "Devil Square", secondText: "старт - 00:01" },
  "1.0.0": { firstText: "Devil Square", secondText: "старт - 00:01" },
  "1.0.0": { firstText: "Devil Square", secondText: "старт - 00:01" },
  "1.0.0": { firstText: "Devil Square", secondText: "старт - 00:01" },
  "1.0.0": { firstText: "Devil Square", secondText: "старт - 00:01" },
  "1.0.0": { firstText: "Devil Square", secondText: "старт - 00:01" },
  "1.0.0": { firstText: "Devil Square", secondText: "старт - 00:01" },
  "1.0.0": { firstText: "Devil Square", secondText: "старт - 00:01" },
  "1.0.0": { firstText: "Devil Square", secondText: "старт - 00:01" },
  "1.0.0": { firstText: "Devil Square", secondText: "старт - 00:01" },
  "1.0.0": { firstText: "Devil Square", secondText: "старт - 00:01" },
  "1.0.0": { firstText: "Devil Square", secondText: "старт - 00:01" },
  "1.0.0": { firstText: "Devil Square", secondText: "старт - 00:01" },
  "1.0.0": { firstText: "Devil Square", secondText: "старт - 00:01" },
  "1.0.0": { firstText: "Devil Square", secondText: "старт - 00:01" },
  "1.0.0": { firstText: "Devil Square", secondText: "старт - 00:01" },
  "1.0.0": { firstText: "Devil Square", secondText: "старт - 00:01" },
  "1.0.0": { firstText: "Devil Square", secondText: "старт - 00:01" },
  "1.0.0": { firstText: "Devil Square", secondText: "старт - 00:01" },
  "1.0.0": { firstText: "Devil Square", secondText: "старт - 00:01" },
  "1.0.0": { firstText: "Devil Square", secondText: "старт - 00:01" },
  "1.0.0": { firstText: "Devil Square", secondText: "старт - 00:01" },
  "1.0.0": { firstText: "Devil Square", secondText: "старт - 00:01" },
  "1.0.0": { firstText: "Devil Square", secondText: "старт - 00:01" },
  "1.0.0": { firstText: "Devil Square", secondText: "старт - 00:01" },
  "1.0.0": { firstText: "Devil Square", secondText: "старт - 00:01" },
};
let ivents2 = {
  "1.22.43": { firstText: "Devil Square", secondText: "старт - 00:011" },
  "1.22.44": { firstText: "Devil Square", secondText: "старт - 00:012" },
  "1.22.46": { firstText: "Devil Square", secondText: "старт - 00:013" },
};
////////////////////////////////////////////////////

async function check(firstText, secondText) {
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
              firstText = bold(firstText);
              await targetChannel.send(
                `${firstText} ${" " + ":" + " " + secondText}`
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
    ////////////////////////////////////////////////
    function timeChecker(dayOfWeek, hours, minutes) {
      const now = new Date();
      const currentDayOfWeek = now.getUTCDay(); // Воскресенье - 0, Понедельник - 1, ..., Суббота - 6
      const currentHours = +now.getUTCHours() + 2;
      const currentMinutes = now.getUTCMinutes();
      const currentDate = `${currentDayOfWeek}.${currentHours}.${currentMinutes}`;
      if (ivents.currentDate) {
        doSomething(
          ivents2.currentDate.firstText,
          ivents2.currentDate.secondText
        );
      }
      console.log(currentDate);
    }
    await doSomething("dsadsa", "ttttt");
    //console.log(ivents2.hasOwnProperty('1.22.36'))
    //console.log(ivents2['1.22.36'])

    //////////////////////////////////////////////////////
    // scheduleTask(17, 04, async () => {
    //  await doSomething('eee', '213')
    // });
    //scheduleTask(3, 21, async () => {
    // await doSomething();
    //});
  } catch (e) {}
}
keepAlive();
check();
