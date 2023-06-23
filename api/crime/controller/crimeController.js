const Crime = require("../model/Crime");
const Comment=require("../model/Comment");
const Notification = require("../model/Notification");
const User=require("../../user/model/User");
exports.createNewCrime = async (req, res, next) => {
  try {
    const { reporterEmail, crimeTitle, crimeAddress, crimeCity, crimeDesc, crimeDate, crimeLevel } = req.body;
    const newCrime = new Crime({
      reporterEmail,
      crimeTitle,
      crimeCity: crimeCity.toLowerCase(),
      crimeAddress,
      crimeDesc,
      crimeDate,
      crimeLevel,
    });

    await newCrime.save();

    const users = await User.find({ address: crimeCity.toLowerCase() });

    const notifications = users.map(async (user) => {
      if (user.email !== reporterEmail) {
        const notification = new Notification({
          title: 'New Crime Alert',
          description: `A new crime titled "${crimeTitle}" has been reported in ${crimeCity.charAt(0).toUpperCase() + crimeCity.slice(1).toLowerCase()}. Please stay vigilant.`,
          address: crimeCity.toLowerCase(),
          status: 'unread',
          userId: user._id
        });

        await notification.save();
      }
    });

    await Promise.all(notifications);

    return res.status(200).json({ title: 'Crime created' });
  } catch (error) {
    console.error('Failed to create crime:', error);
    return res.status(500).json({ error: 'Failed to create crime' });
  }
};



exports.getNotifications = async (req, res) => {
  try {
    const city = req.params.city;
    const userId = req.params.userId;

    const notifications = await Notification.find({
      address: city,
      $or: [
        { userId },
        { userId: { $exists: false } }
      ]
    });

    console.log(notifications);
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
};

exports.markAsRead = async (req, res) => {
  try {
    const notificationId = req.params.id;

    const notification = await Notification.findById(notificationId);
    if (!notification) {
      return res.status(404).json({ error: 'Notification not found' });
    }

    notification.status = 'read';
    await notification.save();

    res.status(200).json({ message: 'Notification marked as read' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to mark notification as read' });
  }
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
  exports.deleteComment = (req, res, next) => {
    Comment.findByIdAndDelete(req.params.id)
      .then(() => {
        res.status(200).json({ message: 'Comment deleted successfully' });
      })
      .catch((error) => {
        res.status(500).json({ message: 'Failed to delete comment', error });
      });
  };
  
  exports.deleteReply = (req, res, next) => {
    Comment.findByIdAndUpdate(
      req.params.commentId,
      { $pull: { replies: { _id: req.params.replyId } } },
      { new: true }
    )
      .then((comment) => {
        res.status(200).json({ message: 'Reply deleted successfully', comment });
      })
      .catch((error) => {
        res.status(500).json({ message: 'Failed to delete reply', error });
      });
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
  
  