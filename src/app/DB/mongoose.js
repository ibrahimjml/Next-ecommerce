const mongoose = require("mongoose");
 
 const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("connected to MongoDB");
  } catch (error) {
    console.log("ERROR WITH CONNECTING  MongoDB", error);
  }
};
module.exports = { connectMongoDB };