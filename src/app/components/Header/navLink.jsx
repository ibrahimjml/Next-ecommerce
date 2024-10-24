"use client"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faPlus, faRightToBracket, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import {useCart} from "@/app/context/cartcontext"
import Darkmodetoggle from "../darkmodetoggle/darkmode"

export default function Navlink({issignedin=false,isregistered=false}) {
  const{data : session,status}=useSession();
  const { cart } = useCart();

  const totalPrice = cart.reduce((total, product) => total + product.price * product.quantity,0);

  const totalItems = cart.length;

  if (status === "authenticated" && session.user.role === "admin" ) {
    return (
      <nav className="links flex">
        <Darkmodetoggle/>
        <Link
          className="register"
          style={{ marginRight: "0.6rem" }}
          href="/admin"
        >
          <FontAwesomeIcon
            className="fa-solid fa-user-plus"
            style={{
              width: "0.8rem",
              color:"white"
            }}
            icon={faPlus}
          />
          Add Product
        </Link>
        <button className='sign-in' onClick={()=>{signOut()}}>Sign Out</button>
        <p style={{ marginBottom: "0" }}> {session.user.name} ♥</p>
      </nav>
    );
  }


  return (
    <nav className="links flex">
      {status === "loading" &&(<p>Loading...</p>)}
          

  
          {status === "authenticated" && (
            <>
            <Darkmodetoggle />
            <Link
            style={{ position: "relative" }}
            className="cart"
            href="/cart"
          >
            <FontAwesomeIcon style={{width:"1rem"}} className="fa-solid fa-cart-shopping" icon={faCartShopping}/>
            ${totalPrice}
            <span className="products-number">{totalItems}</span>
          </Link>
            <button className='sign-in' onClick={()=>{signOut()}}>Sign Out</button>
            <p>{session.user.name}</p>
            </>
          )}
          {status === "unauthenticated" && (
            <>
            <Darkmodetoggle />
            <Link
            style={{ position: "relative" }}
            className="cart"
            href="/cart"
          >
            <FontAwesomeIcon style={{width:"1rem"}} className="fa-solid fa-cart-shopping" icon={faCartShopping}/>
            ${totalPrice}
            <span className="products-number">{totalItems}</span>
          </Link>
            <Link className={`sign-in ${issignedin?"border":""}`}  href="/signin">
            <FontAwesomeIcon style={{width:"1rem",color:"white"}} className="fa-solid fa-right-to-bracket" icon={faRightToBracket}/>
            Sign in
          </Link>
          <Link className={`register ${isregistered?"border":""}`} href="/register">
            <FontAwesomeIcon style={{width:"1rem",color:"white"}} className="fa-solid fa-user-plus" icon={faUserPlus}/>
            Register
          </Link>
          
            </>
          )}
          
        </nav>
  )
}
