const Users = require("../models/users.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class Auth {
  async loginAndPasswordCheck(login, passwordFromRequest) {
    let user = await Users.findOne({ login });
    if (!!user) {
      return new Promise((resolve, reject) => {
        bcrypt.compare(passwordFromRequest, user.password, function (err, res) {
          if (err) return reject(err);
          return resolve(res);
        });
      });
    } else {
      return false;
    }
  }

  async createToken(login) {
    let token = jwt.sign({ login }, "dev-jwt", { expiresIn: 60 * 60 * 3 });
    return `Bearer ${token}`;
  }
}

let auth = new Auth();

module.exports = auth;
