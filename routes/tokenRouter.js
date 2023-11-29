const express = require("express");
const tokenController = require("../controllers/tokenController");
const tokenController1 = require("../controllers/tokenController1");
const router = express.Router();

router.get("/", tokenController.check);
router.get("/1", tokenController1.check);

module.exports = router;
