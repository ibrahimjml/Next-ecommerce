const mongoose = require("mongoose");
 const Schema = mongoose.Schema;
 const models = mongoose.models;


 const productSchema = new Schema({
  image : { type: String,required:true},
  title: { type: String,required:true},
  price: { type: Number,required:true},
  description: { type: String,required:true},
  category :{type:String,enum:['men','women','kids'],reuired:true}  
},
{ timestamps: true }
);


 const ProductModel = models.Product || mongoose.model("Product", productSchema);


 module.exports = ProductModel;