const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt= require("jsonwebtoken");
exports.registerNewUser = async (req, res, next) => {
  console.log(req.body);
  const newUser = new User({
    firstname:req.body.firstname,
    lastname:req.body.lastname,
    password: bcrypt.hashSync(req.body.password, 10),
    email:req.body.email,
    address:req.body.address
  });
  newUser.save(err =>{
    if(err){
      return res.status(400).json({
        title:'error',
        error:'Email in use!'
      })
    }
    return res.status(200).json({
      title:"signup success"
    })
  });
};

exports.loginUser = async (req, res, next) => {
    User.findOne({email:req.body.email},(err,user) =>{
      if(err) return res.status(500).json({
        title:"server error",
        error:er
      })
      if(!user) return res.status(401).json({
        title:"user not found",
        error:"invalid email"
      })
      if(!bcrypt.compareSync(req.body.password, user.password)){
        return res.status(401).json({
          title:"login failed",
          error:"invalid password"
        })
      }
      // IF ALL GOOD
      let token = jwt.sign({userId: user._id}, "secretkey");
      res.status(200).json({
        title:"Login successful!",
        token:token
      })
    })
  };

  exports.getUserDetails = async (req, res) => {
    await res.json(req.userData);
  };