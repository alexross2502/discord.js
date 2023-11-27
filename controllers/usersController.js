const Users = require("../models/users.js");
const auth = require("../utils/auth.js");
const passwordHash = require("../utils/passwordHash.js");

async function check(req, res) {
  try {
    let { login, password } = req.body;
    let result = await auth.loginAndPasswordCheck(login, password);
    if (result) {
      let token = await auth.createToken(login);
      res.status(200).json(token).end();
    } else {
      res.status(400).json({ message: "Wrong login or password" });
    }
  } catch (e) {
    res.status(400).json({ message: e.message }).end();
  }
}

async function registration(req, res) {
  try {
    let { login, password } = req.body;
    let hashedPassword = await passwordHash(password);
    const user = new Users({ login, password: hashedPassword });
    await user.save();
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
