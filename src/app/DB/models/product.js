const mongoose = require("mongoose");
 const Schema = mongoose.Schema;
 const models = mongoose.models;


 const productSchema = new Schema({
   image : String,
   title: String,
   price: Number,
   description: String,
   
   
 });


 const ProductModel = models.Product || mongoose.model("Product", productSchema);


 module.exports = ProductModel;