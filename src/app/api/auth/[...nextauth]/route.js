import UserModal from "@/app/DB/models/user";
import { connectMongoDB } from "@/app/DB/mongoose";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions = {
 providers: [
  CredentialsProvider({

  name: "Credentials",

  credentials: {},
  async authorize(credentials, req) {

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
        return null
       }

    } else {
    
      return null

    }
  }
})
],

secret: process.env.SECRET_KEY,


pages: {
  signIn: '/signin',
  
},
callbacks: {
  async jwt({ token, user }) {
  
    if (user) {
      token.role = user.role;
    }
    return token;
  },

  async session({ session, token }) {
  
    if (token) {
      session.user.role = token.role;
    }
    return session;
  },
},
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };