const express = require("express");
const router = express.Router();
const crimeController = require("../controller/crimeController");

router.post("/createCrime", crimeController.createNewCrime);
router.get("/crimes", crimeController.getAllCrimes);


module.exports = router;