const { Client, GatewayIntentBits, bold } = require("discord.js");
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});
const express = require("express");
const axios = require("axios");

async function doSomething(firstText, secondText) {
  await client.login(process.env.BOT_TOKEN);
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
          await targetChannel.send(`213421`);
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

async function checker() {}

async function check(req, res) {
  try {
    setTimeout(async () => {
      await doSomething("1", "1");
    }, 1000 * 60);
    setTimeout(async () => {
      await doSomething("2", "2");
    }, 2000 * 60);
    setTimeout(async () => {
      await doSomething("3", "3");
    }, 3000 * 60);
    setTimeout(async () => {
      await doSomething("4", "4");
    }, 4000 * 60);
    setTimeout(async () => {
      await doSomething("5", "5");
    }, 5000 * 60);

    res.status(200).json("ok").end();
  } catch (e) {
    res.status(401).json({ message: e.message }).end();
  }
}

module.exports = { check };
