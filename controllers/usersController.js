const Users = require("../models/users.js");

async function check(req, res) {
  try {
    res.status(200).json(token).end();
  } catch (e) {
    res.status(400).json({ message: e.message }).end();
  }
}

async function registration(req, res) {
  try {
    res.status(200).json(user).end();
  } catch (e) {
    if (e.code === 11000) {
      res.status(400).json({ message: "Login already exists." }).end();
    } else {
      res.status(400).json({ message: e.message }).end();
    }
  }
}

module.exports = { check, registration };
