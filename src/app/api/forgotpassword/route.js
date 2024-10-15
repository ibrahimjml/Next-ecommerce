import { NextResponse } from "next/server";
import crypto from "crypto";
import UserModal from "@/app/DB/models/user";
import nodemailer from 'nodemailer'; 
import { connectMongoDB } from "@/app/DB/mongoose";

export async function POST(request) {
  const { email } = await request.json();
  
  await connectMongoDB();

  const user = await UserModal.findOne({ email });

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  
  const resetToken = crypto.randomBytes(32).toString("hex");
  const resetTokenExpiry = new Date(Date.now() + 3600000); 

    user.resetToken = resetToken;
    user.resetTokenExpiry = resetTokenExpiry;

    await user.save();
    

  const resetLink = `${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken}&email=${email}`;


  const transporter = nodemailer.createTransport({
    service: 'Gmail', 
    auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASS, 
    },
  });


  const mailOptions = {
    from: process.env.EMAIL_USER, 
    to: email, 
    subject: 'Password Reset Request',
    text: `You requested a password reset. Click the link to reset your password: ${resetLink}`,
    html: `<p>You requested a password reset. Click the link below to reset your password:</p>
           <a href="${resetLink}">${resetLink}</a>
           <p>If you did not request this, please ignore this email.</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: 'Password reset link has been sent to your email.' });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ message: 'Error sending email. Please try again.' }, { status: 500 });
  }
}
