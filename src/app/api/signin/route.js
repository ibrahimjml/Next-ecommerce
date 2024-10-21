import { connectMongoDB } from "@/app/DB/mongoose"; 
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModal from "@/app/DB/models/user";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { email, pass } = await request.json(); 


  if (!email || !pass) {
    return NextResponse.json(
      { message: "All inputs must be filled" },
      { status: 400 }
    );
  }

  try {
    await connectMongoDB();
    const user = await UserModal.findOne({ email });


    if (!user) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(pass, user.pass);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }


    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

  
    return NextResponse.json(
      {
        message: "Login successful",
        token, 
        user: { id: user._id, email: user.email, role: user.role },
      },
      { status: 200 }
    );
  
  } catch (error) {
    console.error("Error during sign-in:", error); 
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
  
}

