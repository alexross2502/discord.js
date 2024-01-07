const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const usersSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  respawnInterval: {
    type: String,
  },
  killedTime: {
    type: String,
  },
  nextRespawn: {
    type: String,
  },
});

const Users = mongoose.model("Events", usersSchema);

module.exports = Users;
