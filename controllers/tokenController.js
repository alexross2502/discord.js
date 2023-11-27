const jwt = require("jsonwebtoken");

async function check(req, res) {
  try {
    let token = req.headers.authorization.split(" ")[1];
    await jwt.verify(token, "dev-jwt");
    res.status(200).json("ok").end();
  } catch (e) {
    res.status(401).json({ message: e.message }).end();
  }
}

module.exports = { check };
