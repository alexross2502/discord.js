const express = require('express');
const { Client, GatewayIntentBits } = require('discord.js');

const app = express();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
  ],
});

function doSomething() {
  // ... ваша функция
}

function scheduleTask(hour, minute, callback) {
  // ... ваша функция
}

app.all('/', (req, res) => {
  // Этот обработчик позволяет боту обрабатывать HTTP-запросы от Vercel
  res.send('Bot is running!');
  doSomething();
});

// Пример использования:
scheduleTask(3, 20, () => {
  doSomething();
});

scheduleTask(3, 21, () => {
  doSomething();
});

client.login(process.env.BOT_TOKEN);

// Запускаем веб-сервер Express на порту, который предоставляет Vercel
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

