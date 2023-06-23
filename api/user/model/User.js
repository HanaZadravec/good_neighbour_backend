const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  address: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
