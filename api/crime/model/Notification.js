const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['unread', 'read'],
    default: 'unread'
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  crimeId: {   
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Crime'
  }
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
