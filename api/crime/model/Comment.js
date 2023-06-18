const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    crimeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "crimes",
      required: true,
    },
    commentText: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
