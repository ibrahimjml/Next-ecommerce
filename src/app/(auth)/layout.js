import Footer from "@/app/components/Footer/footer"
import AuthProvider from "../providers/AuthProvider"
import "../globals.css"
import { CartProvider } from "@/app/context/cartcontext";

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
       <body style={{height:"100vh",display:"flex",flexDirection:"column"}}
    
      >
      <AuthProvider>
        <CartProvider>
        {children}
        </CartProvider>
        </AuthProvider>
        <Footer style={{marginTop:"auto"}}/>
        </body>
    </html>
  )
}
