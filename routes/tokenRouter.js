const express = require("express");
const tokenController = require("../controllers/tokenController");
const router = express.Router();
const ee = require("../controllers/123");

router.get("/", tokenController.check);

module.exports = router;
