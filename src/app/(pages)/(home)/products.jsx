"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import Loading from "./loading";
import { useCart } from "@/app/context/cartcontext";
import { styled, useTheme } from "@mui/material/styles";
import { Button, CardActions, CardContent, CardMedia, IconButton, Stack, Typography,Badge } from "@mui/material";
import { Add, Remove, ShoppingCart } from "@mui/icons-material";
import Card from "@mui/material/Card";

export default function Products() {
  
  const [ArrData, setstate] = useState([]);
  const [iserror,setiserror] = useState(false);
  const { handleAddToCart,cart,handleIncreaseQuantity,handleDecreaseQuantity } = useCart();
  const theme = useTheme();

  
  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {},
  }));

  
  
  const productQuantity = (item) => {
    const myProduct = cart.find((items) => items.id === item._id);
    return myProduct.quantity;
  };

  
  useEffect(() => {
    const getData = async () => {
      try{
        const res = await fetch("http://localhost:3000/api/getproducts");

        if (!res.ok) {
          notFound();
        }
  
        const data = await res.json();
        setstate(data);
      }catch(error){
          setiserror(true);
          console.error(error)
      }
      
    };

    getData();
  
  }, []);

  if(iserror){
    return <p style={{ fontSize: "1.5rem", textAlign: "center" }}>Failed to load products. Please try again later.</p>;
  }
  return (
    <>
        
      

<Stack
        direction={"row"}
        sx={{ flexWrap: "wrap", justifyContent: "center" }}
      >
        {ArrData.length === 0 ? (

        <Loading/>
        ) :(  ArrData.map((item) => {
          
          return (
          
            <Card
  className="card"
  key={item._id}
  sx={{ maxWidth: 277, mb: 6, mx: 2 }}
>
  <Link href={`/product-details/${item._id}`}>
    <CardMedia
      component="img"
      sx={{ maxWidth: "300px", maxHeight: "300px" }}
      image={item.image}
      alt={item.title}
    />
  </Link>

  
  <CardContent sx={{ wordBreak: "break-word", minHeight: "130px" }}> 
    <Typography sx={{ fontSize: "20px", fontWeight: "600", textAlign: "center" }}>
      {item.title}
    </Typography>

    <Typography variant="body2" color="text.secondary">
      {item.description}
    </Typography>
  </CardContent>

  <CardActions sx={{ justifyContent: "space-between" }} disableSpacing>
    {cart.some((cartItem) => cartItem.id === item._id) ? (
      <div dir="rtl" style={{ display: "flex", alignItems: "center" }}>
        <IconButton
          color="primary"
          sx={{ ml: "10px" }}
          onClick={() => handleIncreaseQuantity(item._id, productQuantity(item))}
        >
          <Add fontSize="small" />
        </IconButton>

        <StyledBadge badgeContent={productQuantity(item)} color="primary" />

        <IconButton
          color="primary"
          sx={{ mr: "10px" }}
          onClick={() => handleDecreaseQuantity(item._id, productQuantity(item))}
        >
          <Remove fontSize="small" />
        </IconButton>
      </div>
    ) : (
      <Button
        sx={{ textTransform: "capitalize", p: 1, lineHeight: 1.1 }}
        variant="contained"
        color="primary"
        onClick={() => handleAddToCart(item)}
      >
        <ShoppingCart sx={{ fontSize: "18px", mr: 1 }} />
        Add to cart
      </Button>
    )}

    <Typography mr={1} variant="body1" color={theme.palette.error.light}>
      ${item.price}
    </Typography>
  </CardActions>
</Card>
          );
        }))}
    
      
      </Stack>
    </>
  );
}
