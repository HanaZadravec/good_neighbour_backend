const Crime = require("../model/Crime");
const Comment=require("../model/Comment");
exports.createNewCrime = async (req, res, next) => {
    const newCrime = new Crime({
      reporterEmail: req.body.reporterEmail,
      crimeTitle: req.body.crimeTitle,
      crimeAddress: req.body.crimeAddress,
      crimeCity: req.body.crimeCity,
      crimeDesc: req.body.crimeDesc,
      crimeDate: req.body.crimeDate
    });
    console.log(newCrime);
    newCrime.save(err =>{
        if(err){
          console.log(err);
        }
        return res.status(200).json({
          title:"crime created"
        })
      });
  };

exports.getAllCrimes = async (req, res, next) => {
  try {
    const crimes = await Crime.find();
    res.status(200).json(crimes);
  } catch (err) {
    res.status(500).json({ error: "Failed to get crimes" });
  }
};

exports.postComment = async (req, res, next) => {
  const { crimeId, commentText, userEmail } = req.body;

  const newComment = new Comment({
    crimeId,
    commentText,
    userEmail, 
  });
  try {
    const comment = await newComment.save();
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: "Failed to add comment" });
  }
};

  
exports.getComments = async (req, res, next) => {
    try {
      const comments = await Comment.find(); 
      res.json(comments);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch comments' });
    }
  };

  exports.postReply = async (req, res, next) => {
    const { commentId } = req.params;
    const { userEmail, replyText } = req.body;
  
    try {
      const comment = await Comment.findById(commentId);
      if (!comment) {
        return res.status(404).json({ error: 'Comment not found' });
      }
  
      const newReply = {
        userEmail,
        replyText
      };
  
      comment.replies.push(newReply);
      await comment.save();
  
      res.status(201).json(comment);
    } catch (error) {
      res.status(500).json({ error: 'Failed to add reply' });
    }
  };
  
  exports.getReplies = async (req, res, next) => {
    const { commentId } = req.params;
  
    try {
      const comment = await Comment.findById(commentId);
      if (!comment) {
        return res.status(404).json({ error: 'Comment not found' });
      }
  
      res.status(200).json(comment.replies);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch replies' });
    }
  };
  