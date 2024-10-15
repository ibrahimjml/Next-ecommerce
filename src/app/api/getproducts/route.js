import ProductModel from "@/app/DB/models/product";
import { connectMongoDB } from "../../DB/mongoose";
import { NextResponse } from "next/server";

export async function GET(request){

  await connectMongoDB();
  const category = request.nextUrl.searchParams.get('category');
  let products;
  if(category){
    products = await ProductModel.find({category});
  }else{

    products = await ProductModel.find().sort({ createdAt: -1 });
  }

  return NextResponse.json(products);
}