"use client"
import { useState } from "react";
import Header from "@/app/components/Header/header";
import "../signin/signin.css"
import Link from "next/link";
export default function Request() {

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading,setloading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true); 

if(!email) {
  setloading(false);
 setMessage("please type your email");
 return;
}
    const res = await fetch("/api/forgotpassword", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    setMessage(data.message);
  setloading(false);
  };
  return (
    <>
    <Header/>
    <div>
      <h1 style={{textAlign:"center",marginTop:"12px"}}>Request Password Reset</h1>
      <form onSubmit={handleSubmit}>
      <div className="input-group">
          <input
            type="email"
            placeholder=" "
            value={email}
            onChange={(eo) => {
              setEmail(eo.target.value);
            }}
          />
          <label >Email :</label>
        </div>
        <button type="submit" style={{marginInline:"22%"}}>{loading ? "Loading.." : "Request Reset"}</button>
        <Link href={"/signin"} style={{fontSize:"15px",color:"darkgray",marginTop:"10px"}}>
        Back To LoginPage
        </Link>
      </form>
      {message  && <p style={{textAlign:"center",fontSize:"20px",color:"red"}}>{message}</p>}
      
    </div>
    </>
  );
};

