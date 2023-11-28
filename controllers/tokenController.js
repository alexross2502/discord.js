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
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
//const puppeteer = require("puppeteer");
const puppeteer = require("puppeteer");
const chromium = require("chrome-aws-lambda");

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
          await targetChannel.send(`${firstText} ${secondText}`);
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

async function check(req, res) {
  try {
    const url = "https://mu.bless.gs/ru/";
    const browser = await chromium.puppeteer.launch({
      args: [...chromium.args, "--no-sandbox", "--disable-setuid-sandbox"],
      executablePath: await chromium.executablePath,
    });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "domcontentloaded" });

    // Подождем 5 секунд (или другое нужное время)
    //await page.waitForTimeout(5000);

    // Теперь, перед ожиданием селектора, остановим выполнение на несколько секунд
    await page.evaluate(() => {
      return new Promise((resolve) => {
        // Останавливаем выполнение на 3 секунды (можно изменить)
        setTimeout(() => {
          resolve();
        }, 3000);
      });
    });

    // Теперь дождемся появления элемента #ivents
    //await page.waitForSelector("#ivents");

    // Затем получим данные
    const eventsContent = await page.evaluate(() => {
      let content = [];
      document.querySelectorAll(".event").forEach((element) => {
        content.push(element.textContent.trim());
      });
      return content;
    });

    //console.log(await eventsContent);

    const timeNow = await page.$eval("#time", (element) =>
      element.textContent.trim()
    );
    //console.log(await title);

    await browser.close();
    await doSomething(eventsContent[1], eventsContent[2]);
    await doSomething(eventsContent[3], eventsContent[4]);
    await doSomething(eventsContent[5], eventsContent[6]);
    res.status(200).json({ eventsContent }).end();
  } catch (e) {
    res.status(401).json({ message: e.message }).end();
  }
}

module.exports = { check };
