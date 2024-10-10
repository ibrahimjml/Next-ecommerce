"use client";
import { useState, useEffect } from "react";
import Footer from "@/app/components/Footer/footer";
import Header from "@/app/components/Header/header";
import "./product-details.css";
import Image from "next/image";
import AdminButtons from "./adminButtons";
import Loading from "../../(home)/loading";
import { useCart } from "@/app/context/cartcontext";
import { useRouter } from "next/navigation";
import { Badge, Button, IconButton } from "@mui/material";
import { Add, Remove, ShoppingCart } from "@mui/icons-material";
import { styled, useTheme } from "@mui/material/styles";


export default function Page({ params }) {
  const [loading, setLoading] = useState(true);
  const [objData, setObjData] = useState(null);
  const router = useRouter();
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
    const fetchData = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/getOneproduct?id=${params.id}`
        );
        if (!res.ok) {
          router.push("/404");
          return ;
        }
        const data = await res.json();
        setObjData(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch product:", error);
        router.push("/404");
        
      }finally{
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id,router]);

  if (loading) {
    return (
      <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
        <Loading/>
      </div>
    )
  };

  if (!objData) {
    return router.push("/404");
  } else {
    return (
      <>
        <div
          className="products"
          style={{
            height: "100vh",
            display: "grid",
            alignItems: "center",
            gridTemplateRows: "auto 1fr auto",
          }}
        >
          <Header />
          <div style={{width:"80%",marginInline:"auto"}} >
            <main style={{ textAlign: "center",marginInline:"auto" }} className="flex">
              <Image alt="" src={objData.image} width={200} height={200} priority={true}/>
              <div className="product-details">
          
                  <div style={{textAlign:"left"}}>
                    <h2>{objData.title}</h2>
                    <p className="price">${objData.price}</p>
                  </div>
            
                <p className="description">{objData.description}</p>

                {cart.some(cartItem => cartItem.id === objData._id) ? 
                (
                  <div dir="rtl" style={{textAlign:"left"}}>
                    <IconButton
                      color="primary"
                      sx={{ ml: "10px" }}
                      onClick={() => {
                        handleIncreaseQuantity(objData._id, productQuantity(objData));
                      }}
                    >
                      <Add fontSize="small" />
                    </IconButton>

                    <StyledBadge badgeContent={productQuantity(objData)} color="primary" />

                    <IconButton
                      color="primary"
                      sx={{ mr: "10px" }}
                      onClick={() => {
                        handleDecreaseQuantity(objData._id, productQuantity(objData));
                      }}
                    >
                      <Remove fontSize="small" />
                    </IconButton>
                  </div>) : (
                      <>
                      <Button
                      sx={{ textTransform: "capitalize", p: 1, lineHeight: 1.1, marginRight:"30px" }}
                      variant="contained"
                      color="primary"
                      onClick={()=>{handleAddToCart(objData)}}
                    >
                    <ShoppingCart sx={{ fontSize: "18px", mr: 1 }} />
                   Add to cart
                 
                    </Button>
                    </>
                  )}
              </div>
            </main>
            <AdminButtons ProductId={params.id} />
          </div>
          <Footer />
        </div>

      </>
    );
  }
}
