const express = require("express");
const router = express.Router();

const UserController = require("../controllers/User.controller");
const ensureToken = require("../jwt");
router.get("/:id", ensureToken, UserController.getUserById);

module.exports = router;
