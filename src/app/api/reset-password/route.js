import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt'; // for hashing passwords
import UserModal from "@/app/DB/models/user";
import { connectMongoDB } from "@/app/DB/mongoose";

export async function POST(request) {
  const { password, token, email } = await request.json();

  await connectMongoDB();

  const user = await UserModal.findOne({ email });

  console.log('Token expiry:', Date.now(), user.resetTokenExpiry);
  if ( user.resetToken !== token || Date.now() > user.resetTokenExpiry) {
    return NextResponse.json({ message: 'Invalid or expired token' }, { status: 400 });
  }

  const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt);

  user.pass = hashedPassword;
  user.resetToken = null;
  user.resetTokenExpiry = null;
  await user.save();

  return NextResponse.json({ message: 'Password has been reset successfully' });
}
