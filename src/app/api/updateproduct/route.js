import ProductModal from "@/app/DB/models/product";
import { connectMongoDB } from "../../DB/mongoose";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; 
import { NextResponse } from "next/server";

export async function PUT(request){

  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const data = await request.json();
  

  await connectMongoDB();

   await ProductModal.updateOne({
    _id : data.ProductId
  },
  {    
    title : data.title,
    price : data.price,
    category: data.category,
    description : data.description

  })

  return NextResponse.json({});
}