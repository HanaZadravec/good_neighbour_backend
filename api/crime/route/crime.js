const express = require("express");
const router = express.Router();
const crimeController = require("../controller/crimeController");

router.post("/createCrime", crimeController.createNewCrime);
router.get("/crimes", crimeController.getAllCrimes);
router.post("/comment", crimeController.postComment);
router.get("/getComments",crimeController.getComments);
router.post('/comment/:commentId/reply', crimeController.postReply);
router.get('/comment/:commentId/replies', crimeController.getReplies);

module.exports = router;