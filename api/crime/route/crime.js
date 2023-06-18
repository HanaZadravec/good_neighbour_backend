const express = require("express");
const router = express.Router();
const crimeController = require("../controller/crimeController");

router.post("/createCrime", crimeController.createNewCrime);
router.get("/crimes", crimeController.getAllCrimes);
router.post("/comment", crimeController.postComment);
router.get("/getComments",crimeController.getComments);

module.exports = router;