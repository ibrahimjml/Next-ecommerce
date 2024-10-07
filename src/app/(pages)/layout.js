import { Inter } from "next/font/google";
import "../globals.css";
import AuthProvider from "../providers/AuthProvider";
import { CartProvider } from "@/app/context/cartcontext";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} style={{height:"100vh"}}>
    <AuthProvider>
      <CartProvider>
        {children}
        </CartProvider>
        </AuthProvider>
        </body>
    </html>
  );
}