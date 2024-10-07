import "./cart.css"
import Header from '@/components/Header/header'
import Cartpage from "./cartpage"


export default function Cart() {


  return (
    <>
    <Header/>
  <div style={{display:"flex",justifyContent:"center",height:"80vh",alignItems:"center"}}>
    <main style={{ textAlign: "center" }} >
  <Cartpage/>
</main>
</div>

</>
  )
}
