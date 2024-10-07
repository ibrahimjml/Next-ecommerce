const mongoose = require("mongoose");
 const Schema = mongoose.Schema;
 const models = mongoose.models;


 const userSchema = new Schema({
   name: String,
   email: String,
   pass: String,
   role : {type:String,enum:['user','admin'],default:'user'},
   
 });


 const UserModal = models.User || mongoose.model("User", userSchema);


 module.exports = UserModal;