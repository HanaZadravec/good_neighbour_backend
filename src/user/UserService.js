var userModel= require('./UserModel');
var key='123456789trytryrtyr';
var encryptor=require('simple-encryptor')(key);

module.exports.createUserDBService = async (userDetails) => {
    try {
      var userModelData = new userModel();
      userModelData.firstname = userDetails.firstname;
      userModelData.lastname = userDetails.lastname;
      userModelData.password = userDetails.password;
      var encrypted = encryptor.encrypt(userDetails.password);
      userModelData.password = encrypted;
      userModelData.email = userDetails.email;
      userModelData.address = userDetails.address;
  
      await userModelData.save(); 
  
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  
  module.exports.loginUserDBService = async (userDetails) => {
    try {
        const result = await userModel.findOne({email: userDetails.email});
        if (result != undefined && result != null) {
            const decrypted = encryptor.decrypt(result.password);
            if (decrypted == userDetails.password) {
                return {status: true, message: "User Validated successfully!"};
            } else {
                throw {status: false, message: "User Validated failed"};
            }
        } else {
            throw {status: false, message: "User Error Details"};
        }
    } catch (error) {
        throw {status: false, message: "Invalid data"};
    }
};
