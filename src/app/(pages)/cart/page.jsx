import "./cart.css"
import Header from '@/app/components/Header/header'
import Cartpage from "./cartpage"
import Footer from "@/app/components/Footer/footer"


export default function Cart() {


  return (
    <>
      
        <div style={{height: "100vh",  display: "grid",  alignItems: "center",  gridTemplateRows: "auto 1fr auto",overflowY:"hidden"}}>
            <Header/>
  <Cartpage/>
<Footer/>
</div>
</>
  )
}
