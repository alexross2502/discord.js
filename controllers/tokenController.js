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
const puppeteer = require("puppeteer");
const chromium = require("chrome-aws-lambda");
const playwright = require("playwright-core");
// exports.handler = async (event, context) => {
//   const browser = await puppeteer.launch({
//     args: ['--no-sandbox', '--disable-setuid-sandbox'],
//   });

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
    (async () => {
      // const browser = await playwright.chromium.launch({
      //   args: chromium.args,
      //   executablePath: await chromium.executablePath,
      //   headless: chromium.headless,
      // });
      const browser = await puppeteer.launch();
      const url = "https://mu.bless.gs/ru/";

      const page = await browser.newPage();
      await page.goto(url, { waitUntil: "domcontentloaded" });
      await page.evaluate(() => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve();
          }, 3000);
        });
      });
      const eventsContent = await page.evaluate(() => {
        let content = [];
        document.querySelectorAll(".event").forEach((element) => {
          content.push(element.textContent.trim());
        });
        return content;
      });
      const timeNow = await page.$eval("#time", (element) =>
        element.textContent.trim()
      );
      console.log(await eventsContent);
      await doSomething(eventsContent[1], eventsContent[2]);
      await doSomething(eventsContent[3], eventsContent[4]);
      await doSomething(eventsContent[5], eventsContent[6]);

      await browser.close();
    })();
    /*
    exports.handler = async (event, context, callback) => {
      let result = null;
      let browser = null;

      try {
        browser = await chromium.puppeteer.launch({
          args: chromium.args,
          defaultViewport: chromium.defaultViewport,
          executablePath: await chromium.executablePath,
          headless: chromium.headless,
          ignoreHTTPSErrors: true,
        });

        const url = "https://mu.bless.gs/ru/";
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: "domcontentloaded" });
        await page.evaluate(() => {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve();
            }, 3000);
          });
        });
        const eventsContent = await page.evaluate(() => {
          let content = [];
          document.querySelectorAll(".event").forEach((element) => {
            content.push(element.textContent.trim());
          });
          return content;
        });
        const timeNow = await page.$eval("#time", (element) =>
          element.textContent.trim()
        );
        console.log(await eventsContent);
        await doSomething(eventsContent[1], eventsContent[2]);
        await doSomething(eventsContent[3], eventsContent[4]);
        await doSomething(eventsContent[5], eventsContent[6]);
        //result = await page.title();
      } catch (error) {
        return callback(error);
      } finally {
        if (browser !== null) {
          await browser.close();
        }
      }

      return callback(null, result);
    };
    */

    // const url = "https://mu.bless.gs/ru/";
    // const browser = await puppeteer.launch();
    // const page = await browser.newPage();
    // await page.goto(url, { waitUntil: "domcontentloaded" });

    // await page.evaluate(() => {
    //   return new Promise((resolve) => {

    //     setTimeout(() => {
    //       resolve();
    //     }, 3000);
    //   });
    // });

    // const eventsContent = await page.evaluate(() => {
    //   let content = [];
    //   document.querySelectorAll(".event").forEach((element) => {
    //     content.push(element.textContent.trim());
    //   });
    //   return content;
    // });

    // const timeNow = await page.$eval("#time", (element) =>
    //   element.textContent.trim()
    // );

    // await browser.close();
    // await doSomething(eventsContent[1], eventsContent[2]);
    // await doSomething(eventsContent[3], eventsContent[4]);
    // await doSomething(eventsContent[5], eventsContent[6]);
    res.status(200).json("ok").end();
  } catch (e) {
    res.status(401).json({ message: e.message }).end();
  }
}

module.exports = { check };
