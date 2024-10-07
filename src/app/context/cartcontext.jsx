"use client"
import { createContext, useContext, useState, useEffect } from "react";

// Create the context
const CartContext = createContext();

// Hook to use the cart context
export const useCart = () => useContext(CartContext);

// CartProvider component to wrap around your app
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Retrieve cart from 
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    if (storedCart) {
      setCart(storedCart);
    }
  }, []);

  // Save cart to localStorage 
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.id !== id);
      localStorage.setItem("cart", JSON.stringify(updatedCart)); // Update localStorage
      return updatedCart;
    });
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
      value={{ cart, addToCart, removeFromCart, updateCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
