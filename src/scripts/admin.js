require('dotenv').config();

const { connectMongoDB } = require('../app/DB/mongoose');
const User = require('../app/DB/models/user')
const bcrypt = require('bcrypt');
const admnEmail = process.env.ADMIN_EMAIL;
const admnPass = process.env.ADMIN_PASS;

 connectMongoDB();

async function createadmin(){
try{
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(admnPass, salt);
  
  const admin = new User({
    name : 'admin',
    email : admnEmail,
    pass : hashedPassword,
    role : "admin"
  });
   await admin.save();
   console.log("admin created")
} catch(error){
console.error('Error creating admin',error.message);
} 
}
createadmin();