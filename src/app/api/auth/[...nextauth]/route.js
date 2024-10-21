import UserModal from "@/app/DB/models/user";
import { connectMongoDB } from "@/app/DB/mongoose";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const authOptions = {
 providers: [
  CredentialsProvider({

  name: "Credentials",

  credentials: {
    email: { label: "email", type: "email" },
    pass: { label: "pass", type: "password" },
  },
  async authorize(credentials) {

  await connectMongoDB();

  const user = await UserModal.findOne({
    email : credentials.email,
   });


    if (user) {
      const match = await bcrypt.compare(credentials.pass, user.pass);
       if(match){
        return {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role, 
        };
       }else{
        throw new Error("invalid credantials");
       }

    } else {
    
      throw new Error("No user found ");

    }
  }
})
],

secret: process.env.SECRET_KEY,


pages: {
  signIn: '/signin',
  
},
session: {
  strategy: "jwt", 
},
callbacks: {
  async jwt({ token, user }) {
    if (user) {
      token.role = user.role;
      token.accessToken = jwt.sign(
        { id: user.id, role: user.role }, 
        process.env.JWT_SECRET, 
        { expiresIn: '1h' } 
      );
    
    }
  
    return token;
  },

  async session({ session, token }) {
    if (token) {
      session.user.role = token.role;
      session.accessToken = token.accessToken; 
    }
    return session;
  },
},
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };