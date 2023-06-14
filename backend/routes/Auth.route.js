const express = require("express");
const AuthController = require("../controllers/Auth.controller");

const router = express.Router();

router.post("/login", AuthController.authLogin);
router.post("/signup", AuthController.authSignup);

module.exports = router;
