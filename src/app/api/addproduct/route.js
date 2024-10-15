import ProductModal from "@/app/DB/models/product";
import { connectMongoDB } from "../../DB/mongoose";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";



export async function POST(request){
try{


  // Parse form data
  const formData = await request.formData();
  const title = formData.get("title");
  const price = formData.get("price");
  const category = formData.get("category");
  const description = formData.get("description");
  const file = formData.get("image"); // Get file

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
  price: price,
  category: category,
  description: description,
  image: `/uploads/${filename}`,
 });

  return NextResponse.json({message:"successfuly added product"});

} catch(error){
  console.error(error);
  return NextResponse.json({ message: error.message }, { status: 500 });
}
  
}