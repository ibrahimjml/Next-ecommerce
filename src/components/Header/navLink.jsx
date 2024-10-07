"use client"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faPlus, faRightToBracket, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import { useCart } from '@/app/context/cartcontext';

export default function Navlink({issignedin=false,isregistered=false}) {
  const{data : session,status}=useSession();
  const cartContext = useCart();
  if (!cartContext) {
    
    return (
    
      <nav className="links flex">
      <Link className={`sign-in ${issignedin?"border":""}`}  href="/signin">
            <FontAwesomeIcon style={{width:"1rem",color:"white"}} className="fa-solid fa-right-to-bracket" icon={faRightToBracket}/>
            Sign in
          </Link>
          <Link className={`register ${isregistered?"border":""}`} href="/register">
            <FontAwesomeIcon style={{width:"1rem",color:"white"}} className="fa-solid fa-user-plus" icon={faUserPlus}/>
            Register
          </Link>
          </nav>
    );
  }

  const { cart  } = cartContext;

  // Calculate the total price of items in the cart
  const totalPrice = cart.reduce((total, product) => total + product.price * product.quantity,0);

  // Calculate the total number of items in the cart
  const totalItems = cart.reduce((total, product) => total + product.quantity, 0);
  if (status === "authenticated" && session.user.role === "admin" ) {
    return (
      <nav className="links flex">
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
        <p style={{ marginBottom: "0" }}>Welcome {session.user.name} ♥</p>
      </nav>
    );
  }

  return (
    <nav className="links flex">
      {status === "loading" &&(<p>Loading...</p>)}
          

  
          {status === "authenticated" && (
            <>
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
            <p>Welcome {session.user.name}</p>
            </>
          )}
          {status === "unauthenticated" && (
            <>
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
