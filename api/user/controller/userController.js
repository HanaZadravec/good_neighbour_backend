const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerNewUser = async (req, res) => {
  console.log(req.body);
  let isAdmin = false;
  if (req.body.email === 'admin@gmail.com') {
    isAdmin = true;
  }
  
  const newUser = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    password: bcrypt.hashSync(req.body.password, 10),
    email: req.body.email,
    address: req.body.address.toLowerCase(),
    isAdmin: isAdmin
  });

  newUser.save(err => {
    if (err) {
      return res.status(400).json({
        title: 'error',
        error: 'Email in use!'
      });
    }
    return res.status(200).json({
      title: 'signup success'
    });
  });
};

exports.loginUser = async (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) return res.status(500).json({
      title: 'server error',
      error: err
    });
    if (!user) return res.status(401).json({
      title: 'user not found',
      error: 'invalid email'
    });
    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(401).json({
        title: 'login failed',
        error: 'invalid password'
      });
    }
    // IF ALL GOOD
    let token = jwt.sign({ userId: user._id }, 'secretkey');
    res.status(200).json({
      title: 'Login successful!',
      token: token,
      user: {
        isAdmin: user.isAdmin
      }
    });
  });
};

exports.getUserDetails = (req, res) => {
  let token = req.headers.token;
  jwt.verify(token, 'secretkey', (err, decoded) => {
    if (err) return res.status(401).json({
      title: 'unauthorized'
    });
    // token is valid
    User.findOne({ _id: decoded.userId }, (err, user) => {
      if (err) return console.log(err);
      return res.status(200).json({
        title: 'user grabbed',
        user: {
          id: user._id,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          address: user.address,
          isAdmin: user.isAdmin 
        }
      });
    });
  });
};
