import ProductModal from "@/app/DB/models/product";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; 
import { connectMongoDB } from "../../DB/mongoose";
import { NextResponse } from "next/server";

export async function DELETE(request){


  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const data = await request.json();



  await connectMongoDB();

  const objData=  await ProductModal.deleteOne({
    _id : data.ProductId
  })

  return NextResponse.json(objData);
}