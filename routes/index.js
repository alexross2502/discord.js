const express = require("express");
const usersRouter = require("./usersRouter");
const tokenRouter = require("./tokenRouter");
const router = express.Router();

router.use("/users", usersRouter);
router.use("/token", tokenRouter);

module.exports = router;
