const express = require("express");

const router = express.Router();

const JurnalController = require("../controllers/Jurnal.controller");
const ensureToken = require("../jwt");

router.get("/", ensureToken, JurnalController.getAllJurnal);
router.get("/:id", ensureToken, JurnalController.getAllJurnalUser);
router.post("/", ensureToken, JurnalController.createJurnal);

module.exports = router;
