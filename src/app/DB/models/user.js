const mongoose = require("mongoose");
 const Schema = mongoose.Schema;
 const models = mongoose.models;


 const userSchema = new Schema({

   name: { type: String, required: true },
   email: { type: String, required: true, unique: true },
   pass: { type: String, required: true },
   resetToken: { type: String, default: null },
   resetTokenExpiry: { type: Date, default: null },
   role : {type:String,enum:['user','admin'],default:'user'},
   
 });


 const UserModal = models.User || mongoose.model("User", userSchema);


 module.exports = UserModal;