const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  crimeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Crime',
    required: true
  },
  commentText: {
    type: String,
    required: true
  },
  userEmail: {
    type: String,
    required: true
  },
  replies: [
    {
      userEmail: {
        type: String,
        required: true
      },
      replyText: {
        type: String,
        required: true
      }
    }
  ]
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
