var userService=require('./UserService');

var createUserControllerFn= async (req,res)=>{
    try{
        console.log(req.body);
        var status=await userService.createUserDBService(req.body);
        console.log(status);

        if(status){
            res.send({"status": true,"message":"User created succesfully"})
        }
        else{
            res.send({"status":false, "message":"Error creating user"})
        }
    }catch (err){
        console.log(err);
    }
}

var loginUserControllerFn = async(req,res) =>{
    var result=null;
    try{
        result=await userService.loginUserDBService(req.body);
        if(result.status){
            res.send({"status":true, "message":result.message});
        }else{
            res.send({"status":false, "message":result.message});
        }
    }catch(err){
        console.log(err);
        res.send({"status":false, "message":err.message});
    }
}
module.exports = {createUserControllerFn, loginUserControllerFn};