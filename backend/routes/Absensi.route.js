const express = require("express");
const ensureToken = require("../jwt");
const User = require("../models/User.model");
const Absensi = require("../models/Absensi.model");
const AbsensiController = require("../controllers/Absensi.controller");

const router = express.Router();

router.get("/", ensureToken, AbsensiController.getAllAbsensi);

router.get("/:id", ensureToken, AbsensiController.getAllAbsensiUser);

router.post("/", ensureToken, AbsensiController.createAbsensi);

router.post("/:id/status", ensureToken, AbsensiController.updateStatusAbsensi);

module.exports = router;
