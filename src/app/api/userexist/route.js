import UserModal from "@/app/DB/models/user";
import { connectMongoDB } from "../../DB/mongoose";
import { NextResponse } from "next/server";

export async function POST(request){
  const data = await request.json();
  console.log(data);

  await connectMongoDB();

const user = await UserModal.findOne({
  email : data.email,
 });

 if (user) {
  
  return NextResponse.json({ userExists: true });
} else {
  return NextResponse.json({ userExists: false });
}

}
