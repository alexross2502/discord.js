const express = require('express')
const server = express()
const mongoose = require("mongoose");
const router = require("./routes");
const app = express();


app.use(express.json());
app.use("/api", router);


mongoose
.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}?retryWrites=true&w=majority`
)
.then(() => console.log("connected to db"))
.catch((err) => console.log(`db connection error: ${err}`));

server.all('/', (req, res) => {
  res.send('bot is starting')
})

function keepAlive() {
  server.listen(3000, () => {
    console.log('server ready')
  })

}

module.exports = keepAlive