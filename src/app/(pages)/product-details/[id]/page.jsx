"use client";
import { useState, useEffect } from "react";
import Footer from "@/components/Footer/footer";
import Header from "@/components/Header/header";
import "./product-details.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { notFound } from "next/navigation";
import Image from "next/image";
import AdminButtons from "./adminButtons";
import Loading from "../../(home)/loading";
import { useCart } from "@/app/context/cartcontext";


export default function Page({ params }) {
  const [loading, setLoading] = useState(true);
  const [objData, setObjData] = useState(null);

  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (objData) {
      // Pass only serializable product data (no DOM nodes)
      const productData = {
        id: objData._id,
        title: objData.title,
        price: objData.price,
        image: objData.image,
      };
      addToCart(productData);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/getOneproduct?id=${params.id}`
        );
        if (!res.ok) {
          return notFound();
        }
        const data = await res.json();
        setObjData(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch product:", error);
        setLoading(false);
      }
    };

    fetchData(params.id);
  }, [params.id]);

  if (loading) return <Loading />;

  if (!objData) {
    return notFound();
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
          <div>
            <main style={{ textAlign: "center" }} className="flex">
              <Image alt="" src={objData.image} width={200} height={200} />
              <div className="product-details">
                <div
                  style={{ justifyContent: "space-between" }}
                  className="flex"
                >
                  <h2>{objData.title}</h2>
                  <p className="price">${objData.price}</p>
                </div>
                <p className="description">{objData.description}</p>
                <button className="flex add-to-cart" onClick={handleAddToCart}>
                  <FontAwesomeIcon
                    style={{ width: "1rem" }}
                    icon={faCartPlus}
                  />
                  Add To Cart
                </button>
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
