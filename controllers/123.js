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

module.exports = async (req, res) => {
  const browser = await playwright.chromium.launch();
  const page = await browser.newPage();
  const url = "https://mu.bless.gs/ru/";

  try {
    await page.goto(url, { waitUntil: "domcontentloaded" });

    // Выполните здесь логику парсинга
    const pageTitle = await page.title();
    const pageContent = await page.content();

    res.status(200).json({ title: pageTitle, content: pageContent });
  } catch (error) {
    console.error("Ошибка:", error);
    res.status(500).send("Внутренняя ошибка сервера");
  } finally {
    await browser.close();
  }
};
