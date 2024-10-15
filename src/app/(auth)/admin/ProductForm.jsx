"use client"
import React from 'react'
import "./admin.css"
import { useState } from "react";
import { useRouter } from "next/navigation"
export default function ProductForm() {

  const [error,seterror] = useState(null);
  const [loading,setloading] =useState(false);
  const [image, setimage] = useState(null);
  const [title, settitle] = useState(null);
  const [price, setprice] = useState(null);
  const [category, setcategroy] = useState(null);
  const [description, setdescription] = useState(null);
  const router = useRouter();

  const handlesubmit = async (eo) => {
    eo.preventDefault();
    seterror(null);
    setloading(true);

    if( !title || !price || !description || !image || !category){
      seterror("All inputs must be filled");
      setloading(false);
      return;
  }
  
  //send data to db
  const formData = new FormData();
  formData.set("image",image);
  formData.set("title",title);
  formData.set("price",price);
  formData.set("category",category)
  formData.set("description",description);
  

  const resAddProduct = await fetch("api/addproduct", {
    method: "post",
    
    body: formData,
  });

  const data = await resAddProduct.json();
  console.log(data)

  if(resAddProduct.ok){
    setloading(false);
    router.push("/");
  }else{
    seterror("invalid error");
  }

  setloading(false);
  }
  return (
    
    <div className="container-form">
  <form onSubmit={handlesubmit}>
    <label htmlFor="image">Product Image</label>
    <input type="file" id="image"  onChange={(eo)=>{setimage(eo.target.files[0])}}/>

    <label htmlFor="title">Product Title</label>
    <input type="text" id="title"  placeholder="T-shirt" onChange={(eo)=>{settitle(eo.target.value)}}/>

    <label htmlFor="price">Product Price</label>
    <input type="number" id="price"  placeholder="price" onChange={(eo)=>{setprice(eo.target.value)}}/>
    <select  id="category" onChange={(eo)=>{setcategroy(eo.target.value)}}>
      <option value="category" selected>Category</option>
      <option value="men">Men</option>
      <option value="women">women</option>
      <option value="kids">kids</option>
    </select>
    <label htmlFor="decription">Product Description</label>
    <textarea id="description"  placeholder="Description" rows={3} onChange={(eo)=>{setdescription(eo.target.value)}}></textarea>

    <button className='btn' type='submit'>{loading ? "Loading.." : "Add Product"}</button>
  </form>
  <p style={{color:"red",textAlign:"center"}}>{error}</p>
</div>
  
  )
}
