import ProductModal from "@/app/DB/models/product";
import { connectMongoDB } from "../../DB/mongoose";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import jwt from 'jsonwebtoken';


export async function POST(request){
try{
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

  // Parse form data
  const formData = await request.formData();
  const title = formData.get("title");
  const price = formData.get("price");
  const category = formData.get("category");
  const description = formData.get("description");
  const file = formData.get("image"); // Get file

  if (!file) {
    return NextResponse.json(
      { message: "Image file is required" },
       { status: 400 });
  }
  // Ensure the directory exists
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  // Save file
  const filename = `${Date.now()}-${file.name}`;
  const filepath = path.join(uploadDir, filename);
  const fileStream = fs.createWriteStream(filepath);
  fileStream.write(Buffer.from(await file.arrayBuffer()));
  fileStream.end();



  await connectMongoDB();

 await ProductModal.create({
  title: title,
  price: parseFloat(price),
  category: category,
  description: description,
  image: `/uploads/${filename}`,
 });

  return NextResponse.json({message:"successfuly added product"});

} catch(error){
  console.error(error);
  return NextResponse.json(
    { message: error.message },
     { status: 500 });
}
  
}