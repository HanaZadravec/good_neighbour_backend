const express = require("express");
const router = express.Router();
const crimeController = require("../controller/crimeController");

router.post("/createCrime", crimeController.createNewCrime);
router.get("/crimes", crimeController.getAllCrimes);
router.post("/comment", crimeController.postComment);
router.get("/getComments",crimeController.getComments);
router.post('/comment/:commentId/reply', crimeController.postReply);
router.get('/comment/:commentId/replies', crimeController.getReplies);
router.get('/notifications/:city/:userId', crimeController.getNotifications);
router.put('/notifications/:id', crimeController.markAsRead);
router.delete('/comments/:id', crimeController.deleteComment);
router.delete('/comments/:commentId/replies/:replyId', crimeController.deleteReply);
router.delete('/crimes/:id', crimeController.deleteCrime);
router.put('/markCrime/:id', crimeController.markCrime);

module.exports = router;