const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const usersSchema = new Schema({
  login: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Users = mongoose.model("Users", usersSchema);

module.exports = Users;
