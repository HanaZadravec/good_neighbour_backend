var express = require('express');

var UserController=require('../src/user/UserController');
const router=express.Router();

router.route('/user/login').post(UserController.loginUserControllerFn);
router.route('/user/create').post(UserController.createUserControllerFn);


module.exports=router;
