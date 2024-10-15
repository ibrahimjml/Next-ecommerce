"use client";
import { useState, useEffect } from "react";
import { notFound } from "next/navigation";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loading from "@/app/(pages)/(home)/loading";

export default function Updateform({ ProductId }) {
  const [error, seterror] = useState(null);
  const [loading, setloading] = useState(null);
  const [title, settitle] = useState(null);
  const [price, setprice] = useState(null);
  const [category, setcategory] = useState(null);
  const [description, setdescription] = useState(null);
  const { data: session } = useSession();
  const router = useRouter();


  const handleupdate = async (eo) => {
    eo.preventDefault();
    seterror(null);
    setloading(true);

    if (!title || !price || !description || ! category) {
      seterror("All inputs must be filled");
      setloading(false);
      return;
    }

    const response = await fetch("http://localhost:3000/api/updateproduct", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, price, category , description, ProductId }),
    });

    if (response.ok) {
      router.push("/");
    } else {
      setloading(false);
      seterror("error updating try again");
    }

    setloading(false);
  };

  const [data, setdata] = useState(null);

  useEffect(() => {
    const getData = async (ProductId) => {
      const res = await fetch(
        `http://localhost:3000/api/getOneproduct?id=${ProductId}`
      );
      if (!res.ok) {
        notFound();
      }
      const data = await res.json();

      setdata(data);
      settitle(data.title);
      setprice(data.price);
      setcategory(data.category);
      setdescription(data.description);
    };

    getData(ProductId);
  }, [ProductId]);

  if (!data) {
    return <Loading/>;
  }
  if (!session || session.user.role !== "admin") {
    return null;
  }

  return (
    <div className="container-form">
      <form onSubmit={handleupdate}>
        <label htmlFor="title">Product Title</label>
        <input
          type="text"
          id="title"
          placeholder="T-shirt"
          defaultValue={data.title}
          onChange={(eo) => {
            settitle(eo.target.value);
          }}
        />

        <label htmlFor="price">Product Price</label>
        <input
          type="number"
          id="price"
          placeholder="price"
          defaultValue={data.price}
          onChange={(eo) => {
            setprice(eo.target.value);
          }}
        />
         
         <label htmlFor="category">Category</label>
         <select  id="category" defaultValue={category} onChange={(eo)=>{setcategory(eo.target.value)}}>
         <option value="category" selected>Category</option>
         <option value="men">Men</option>
         <option value="women">women</option>
         <option value="kids">kids</option>
        </select>

        <label htmlFor="decription">Product Description</label>
        <textarea
          id="description"
          placeholder="Description"
          rows={4}
          defaultValue={data.description}
          onChange={(eo) => {
            setdescription(eo.target.value);
          }}
        ></textarea>

        <button className="btn" type="submit">
          {loading ? "Loading.." : "Update"}
        </button>
      </form>
      <p style={{ color: "red", textAlign: "center" }}>{error}</p>
    </div>
  );
}
