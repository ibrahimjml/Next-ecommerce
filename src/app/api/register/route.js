import UserModal from "@/app/DB/models/user";
import { connectMongoDB } from "../../DB/mongoose";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request){
  const data = await request.json();
  console.log(data);

  await connectMongoDB();

  const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(data.pass, salt);

 await UserModal.create({
  name : data.name,
  email : data.email,
  pass : hashedPassword,
  role : 'user',
 });

  return NextResponse.json({});

}
