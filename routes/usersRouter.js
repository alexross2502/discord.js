const express = require("express");
const usersController = require("../controllers/usersController");
const router = express.Router();

router.post("/", usersController.check);
router.post("/registration", usersController.registration);

module.exports = router;
