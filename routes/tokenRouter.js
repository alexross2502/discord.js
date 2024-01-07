const express = require("express");
const tokenController = require("../controllers/tokenController");
const router = express.Router();

router.get("/", tokenController.check);

module.exports = router;
