"use client"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import { useCart } from "@/app/context/cartcontext";
import { useSession } from "next-auth/react";

function Cartpage() {
  const {data:session,status} = useSession()
  const { cart,  removeFromCart, updateCart, clearCart } = useCart();



  const handleRemoveFromCart = (id) => {
    removeFromCart(id);
  };

  const handleIncreaseQuantity = (id, quantity) => {
    updateCart(id, quantity + 1);
  };

  const handleDecreaseQuantity = (id, quantity) => {
    if (quantity > 1) {
      updateCart(id, quantity - 1);
    }
  };

  const calculateSubtotal = () => {
    return cart.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
  };

  return (
    <>
    
    <section className="cart" >
      {cart.length == 0 ?  (<h3>No Items </h3>) : (
  cart.map((product) => (
    
    <article key={product.id} className="product flex" >
      <button onClick={() => handleRemoveFromCart(product.id)}>
        
        <FontAwesomeIcon
      style={{ width: "1.5rem" }}
      className="fa-solid fa-bag-shopping"
      icon={faTrash}
    />
      </button>
      <p className="price">${product.price}</p>
      <div className="flex" style={{ marginRight: "1rem" }}>
        <button className="decrease" onClick={() => handleDecreaseQuantity(product.id, product.quantity)}>-</button>
        <div className="quantity flex">{product.quantity}</div>
        <button className="increase" onClick={() => handleIncreaseQuantity(product.id, product.quantity)}>+</button>
      </div>
      <p className="title">{product.title}</p>
      <Image
        style={{ borderRadius: "0.22rem" }}
        width={70}
        height={70}
        alt={product.title}
        src={product.image}
      />
    </article>
))
      )}
  
    
    </section>
    {cart.length !== 0 &&(
      <>
      <button className="clear" onClick={clearCart}>
      <i style={{ color: "#fff", marginRight: "0.2rem" }} className="fa-solid fa-trash-can icon"></i>
      Clear Cart
    </button>
    <section className="summary">
      <h1>Cart Summary</h1>
      <div className="flex">
        <p className="Subtotal">Subtotal</p>
        <p>${calculateSubtotal()}</p>
      </div>
    {status === "authenticated" && (

        <button disabled="" className="checkout">
          CHECKOUT
        </button>
    )}
    
    {status === "unauthenticated" && <a href="./signin.html">Please Sign in to proceed checkout.</a>}
      
    </section>
    </>
    )}
    
    </>
  )
}

export default Cartpage
