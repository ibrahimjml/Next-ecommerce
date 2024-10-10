import "./cart.css"
import Header from '@/app/components/Header/header'
import Cartpage from "./cartpage"


export default function Cart() {


  return (
    <>
    <Header/>

    <main style={{display:"flex",justifyContent:"center"}} >
  <Cartpage/>
</main>


</>
  )
}
