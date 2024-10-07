"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import Loading from "./loading";
import { useCart } from "@/app/context/cartcontext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";

export default function Products() {
  const [additem,setadditem] = useState([])
  const [ArrData, setstate] = useState([]);
  const { addToCart } = useCart();

  const handleAddToCart = (item) => {
    if (item) {
      // Pass only serializable product data (no DOM nodes)
      const productData = {
        id: item._id,
        title: item.title,
        price: item.price,
        image: item.image,
      };
      addToCart(productData);

       
    }
  };
  

  useEffect(() => {
    const getData = async () => {
      const res = await fetch("http://localhost:3000/api/getproducts");

      if (!res.ok) {
        notFound();
      }

      const data = await res.json();
      setstate(data);
    };

    getData();
    const storedAddedItems = localStorage.getItem("addedItems");
    if (storedAddedItems) {
      setadditem(JSON.parse(storedAddedItems));
    }
  }, []);

  
  return (
    <>
      {ArrData.length == 0 && <Loading />}

      {ArrData.map((item) => {
        const isAdded = additem[item._id] || false;
        return (
          <article title={item.title} key={item._id} className="card">
            <Link href={`/product-details/${item._id}`}>
              <Image
                width={266}
                height={200}
                src={item.image}
                alt={"no image "}
              />
            </Link>
            <div style={{ width: 266 }} className="content">
              <h1 className="title">{item.title}</h1>
              <p className="description">{item.description.slice(0, 111)}..</p>
              <div
                className="flex"
                style={{
                  justifyContent: "space-between",
                  paddingBottom: "0.7rem",
                }}
              >
                <div className="price">{item.price} $</div>
                <button className="add-to-cart flex" onClick={()=>{handleAddToCart(item)}} disabled={isAdded}>
                <FontAwesomeIcon
                    style={{ width: "1rem" }}
                    icon={faCartPlus}
                  />
                  {isAdded ? "Added" : "Add to cart"}
                </button>
              </div>
            </div>
          </article>
        );
      })}
    </>
  );
}
