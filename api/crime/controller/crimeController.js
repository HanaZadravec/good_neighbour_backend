const Crime = require("../model/Crime");
const Comment=require("../model/Comment");
const Notification = require("../model/Notification");
const User=require("../../user/model/User");

exports.createNewCrime = async (req, res) => {
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
          description: `A new crime titled "${crimeTitle}" has been reported in ${crimeCity.charAt(0).toUpperCase() + crimeCity.slice(1).toLowerCase()}. Please stay vigilant without panicking.`,
          address: crimeCity.toLowerCase(),
          status: 'unread',
          userId: user._id,
          crimeId: newCrime._id  
        });

        await notification.save();
      }
    });

    await Promise.all(notifications);
    return res.status(200).json({ title: 'Crime is created' });
  } catch (error) {
    console.error("Couldn't create crime:", error);
    return res.status(500).json({ error: "Couldn't create crime." });
  }
};

exports.getNotifications = async (req, res) => {
  try {
    const city = req.params.city;
    const userId = req.params.userId;
    const notifications = await Notification.find({
      address: city,
      userId
    });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: 'Failed - Could not fetch notifications' });
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
    res.status(200).json({ message: 'Notification marked - read' });
  } catch (error) {
    res.status(500).json({ error: 'Fail - mark notification as read' });
  }
};

exports.getAllCrimes = async (req, res) => {
  try {
    const crimes = await Crime.find();
    res.status(200).json(crimes);
  } catch (err) {
    res.status(500).json({ error: "Fail - get crimes" });
  }
};

exports.postComment = async (req, res) => {
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
    res.status(500).json({ error: "Fail - add comment" });
  }
};

exports.getComments = async (req, res) => {
    try {
      const comments = await Comment.find(); 
      res.json(comments);
    } catch (error) {
      res.status(500).json({ error: 'Fail - fetch comments' });
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
      res.status(500).json({ error: 'Fail - add reply' });
    }
  };

  exports.deleteComment = (req, res) => {
    Comment.findByIdAndDelete(req.params.id)
      .then(() => {
        res.status(200).json({ message: 'Comment deleted successfully' });
      })
      .catch((error) => {
        res.status(500).json({ message: 'Fail - delete comment', error });
      });
  };
  
  exports.deleteReply = (req, res) => {
    Comment.findByIdAndUpdate(
      req.params.commentId,
      { $pull: { replies: { _id: req.params.replyId } } },
      { new: true }
    )
      .then((comment) => {
        res.status(200).json({ message: 'Reply deleted successfully', comment });
      })
      .catch((error) => {
        res.status(500).json({ message: 'Fail - delete reply', error });
      });
  };

  exports.getReplies = async (req, res) => {
    const { commentId } = req.params;
    try {
      const comment = await Comment.findById(commentId);
      if (!comment) {
        return res.status(404).json({ error: 'Comment not found' });
      }
      res.status(200).json(comment.replies);
    } catch (error) {
      res.status(500).json({ error: 'Fail - fetch replies' });
    }
  };
  
  exports.deleteCrime = async (req, res) => {
    try {
      const idCrime = req.params.id;
      await Comment.deleteMany({ crimeId: idCrime });
      await Notification.deleteMany({ crimeId: idCrime });
      await Crime.findByIdAndDelete(idCrime);
      res.status(200).json({ message: 'Crime deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Fail - delete crime', error });
    }
  };
  
  exports.markCrime = async (req, res) => {
  try {
    const idCrime = req.params.id;
    const crime = await Crime.findById(idCrime);
    if (!crime) {
      return res.status(404).json({ error: 'Crime not found' });
    }
      console.log(crime);
    crime.resolved = 'Resolved';
    await crime.save();
    res.status(200).json({ message: 'Crime resolved' });
  } catch (error) {
    res.status(500).json({ error: 'Fail - mark crime as resolved' });
  }
};