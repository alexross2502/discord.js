const { Client, GatewayIntentBits, bold } = require("discord.js");
const events = require("./events");
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

async function check(req, res) {
  try {
    console.log("dsdassad");
    res.status(200).json("ok").end();
  } catch (e) {
    res.status(401).json({ message: e.message }).end();
  }
}

module.exports = { check };
