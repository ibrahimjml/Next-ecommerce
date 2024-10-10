"use client"
import { createContext, useContext, useState, useEffect } from "react";


const CartContext = createContext();


export const useCart = () => useContext(CartContext);


export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    if (storedCart) {
      setCart(storedCart);
    }
  }, []);


  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
    if(existingProduct) return prevCart;

     return [...prevCart, { ...product, quantity: 1 }];
      
    });
  };

  const handleAddToCart = (item) => {
    if (item) {
      
      const productData = {
        id: item._id,
        title: item.title,
        price: item.price,
        image: item.image,
        quantity:1
      };
      addToCart(productData);

       
    }
  };
  
  const removeFromCart = (id) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.id !== id);
      localStorage.setItem("cart", JSON.stringify(updatedCart)); 
      return updatedCart;
    });
  };

  const handleIncreaseQuantity = (id) => {
    const currentItem = cart.find((item) => item.id === id);
    if (currentItem) {
      updateCart(id, currentItem.quantity + 1); 
    }
  };  

  const handleDecreaseQuantity = (id) => {
    const currentItem = cart.find((item) => item.id === id);
    if (currentItem) {
      if (currentItem.quantity > 1) {
        updateCart(id, currentItem.quantity - 1); 
      } else {
        
        removeFromCart(id);
      }
    }
  };

  const updateCart = (id, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
    
  };

  return (
    <CartContext.Provider
      value={{ cart,handleAddToCart, addToCart, removeFromCart, updateCart, clearCart,handleDecreaseQuantity,handleIncreaseQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};
