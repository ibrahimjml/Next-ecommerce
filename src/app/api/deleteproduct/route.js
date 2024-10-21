import ProductModal from "@/app/DB/models/product";
import { connectMongoDB } from "../../DB/mongoose";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

export async function DELETE(request){

  try{
    const data = await request.json();
    
    const token = request.headers.get("Authorization")?.split(" ")[1]; 

    if (!token) {
      return NextResponse.json(
        { message: "You must be authenticated first" },
         { status: 401 });
    }

  
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    
    if (!decoded || decoded.role !== "admin") {
      return NextResponse.json(
        { message: "You are not authorized for this action" },
         { status: 403 });
    }


    await connectMongoDB();
  
      await ProductModal.deleteOne({
      _id : data.ProductId
    })
  
    return NextResponse.json(
      { message: "Post Deleted successfully" },
      {status:200});

  }catch(error){

   console.error(error);
   return NextResponse.json(
    {message:error.message},
  {status:500})
  }
  
}