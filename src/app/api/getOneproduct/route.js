import ProductModal from "@/app/DB/models/product";
import { connectMongoDB } from "../../DB/mongoose";
import { NextResponse } from "next/server";

export async function GET(request){

  const id = request.nextUrl.searchParams.get("id")

  await connectMongoDB();

  const objData=  await ProductModal.findOne({
    _id : id
  })

  return NextResponse.json(objData);
}