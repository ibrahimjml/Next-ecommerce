import ProductModal from "@/app/DB/models/product";
import { connectMongoDB } from "../../DB/mongoose";
import { NextResponse } from "next/server";

export async function GET(request){

  await connectMongoDB();
  const arrData=  await ProductModal.find()

  return NextResponse.json(arrData);
}