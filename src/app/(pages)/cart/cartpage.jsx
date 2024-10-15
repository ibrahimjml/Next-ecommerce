"use client"
import { useEffect, useRef, useState } from 'react';
import {Box,Button,Paper,styled,IconButton,Badge,Typography,Divider,Stack,} from "@mui/material";
import { Add, Delete, Remove } from "@mui/icons-material";
import Image from "next/image"
import { useCart } from "@/app/context/cartcontext";
import { useSession } from "next-auth/react";
import Link from "next/link";

function Cartpage() {
  const {data:session,status} = useSession()
  const { cart,  removeFromCart, clearCart,handleIncreaseQuantity,handleDecreaseQuantity } = useCart();
  const [showScrollbar, setShowScrollbar] = useState(false);
  const contentRef = useRef(null);

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: "#1976d2",
      color: "#fff",
    },
  }));

  const Subtotal = () => {
    return cart.reduce((total, product) => total + product.price * product.quantity,0);
  };

  useEffect(() => {
    if (contentRef.current) {

      const height = contentRef.current.scrollHeight;
      setShowScrollbar(height > 400); 
    }
  }, [cart]); 


return (
  
  <Box >
    <div 
        ref={contentRef}
        style={{
          height: "400px",
          overflowY: showScrollbar ? "scroll" : "hidden"
        }}>
  {cart.length === 0 ? (<h3 style={{textAlign:"center",marginTop:"70px"}}>No Items </h3>)
  : (cart.map((product) =>( 
      

          <Paper  key={product.id} dir="rtl" className="item-container">
            <div className="img-title-parent">
              <Image src={product.image} alt="" width={100} height={100}/>
              <p className="product-name">{product.title}</p>
            </div>
          
            <div style={{ display: "flex", alignItems: "center" }}>
              <IconButton
                sx={{ color: "#1976d2", ml: "10px" }}
                onClick={() => {
                  handleIncreaseQuantity(product.id, product.quantity);
                }}
              >
                <Add />
              </IconButton>
          
              <StyledBadge badgeContent={product.quantity} color="secondary" />
          
              <IconButton
                sx={{ color: "#1976d2", mr: "10px" }}
                onClick={() => {
                  handleDecreaseQuantity(product.id, product.quantity);
                }}
              >
                <Remove />
              </IconButton>
            </div>
          
            <div className="price">
              ${Number(product.price) * Number(product.quantity)}
            </div>
          
            <Button
              sx={{ display: { xs: "none", md: "inline-flex" } }}
              variant="text"
              color="error"
              onClick={() => {
              removeFromCart(product.id);
              }}
            >
              delete
            </Button>
          
            <IconButton
              sx={{
                color: "#ef5350",
                display: { xs: "inline-flex", md: "none" },
              }}
              onClick={() => {
                removeFromCart(product);
              }}
            >
              <Delete />
            </IconButton>
          </Paper>
      
    )))}
</div>
  {cart && cart.length > 0 && (

    <Paper sx={{ width: "fit-content", mx: "auto", mt: "60px",mb:"20px"}}>
      <Typography align="center" p={2} variant="h6">
        Cart Summary
      </Typography>

      <Divider />

      <Stack
        sx={{ justifyContent: "space-between", p: 1.2 }}
        direction={"row"}
      >
        
      
          <Typography variant="body1">Subtotal</Typography>
          <Typography variant="body1">${Subtotal()}</Typography>
            </Stack>
        {status === "unauthenticated" && (
          <Link href={"/signin"} >
            <Typography variant="body1" sx={{ p: 1 }} color="error">Please Sign in to proceed checkout.</Typography>
          </Link>
          )}
    

      <Divider />

      {status === "authenticated" && <Button fullWidth color="primary" variant="contained">CHECKOUT</Button> }
    </Paper>
  )}
  </Box>

);
}

export default Cartpage
