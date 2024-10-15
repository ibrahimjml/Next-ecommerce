"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";
import Header from "@/app/components/Header/header";
import "../signin/signin.css"
import Link from "next/link";

export default function Page() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading,setloading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    const email = urlParams.get("email");

if(!password || !confirmPassword) {
  setloading(false);
  setMessage("Inputs mutbe filled ");
  return;
}

    if (password !== confirmPassword) {
      setloading(false)
      setMessage("Passwords do not match.");
      return;
    }
//creating strong pass
const regPassword =
/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

if (!regPassword.test(password)) {

  setloading(false);
setMessage(
  "Password must be at least 8 characters with 1 uppercase, 1 lowercase, 1 special character and 1 numeric."
);
return;
}
    const res = await fetch("/api/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, token, email }),
    });

    const data = await res.json();
    setMessage(data.message);
    if (res.ok) {
      router.push("/signin");
    }
    setloading(false);
  };

  return (
    <>
    <Header/>
    <div>
      <h1 style={{textAlign:"center",marginTop:"12px"}}>Reset Your Password</h1>
      <form onSubmit={handleSubmit}>
      <div className="input-group">
          <input
            type="password"
            placeholder=" "
            value={password}
            onChange={(eo) => {
              setPassword(eo.target.value);
            }}
          />
          <label >Password :</label>
        </div>
        <div className="input-group">
          <input
            type="password"
            placeholder=" "
            value={confirmPassword}
            onChange={(eo) => {
              setConfirmPassword(eo.target.value);
            }}
          />
          <label >Confirm Password :</label>
        </div>
        <button type="submit">{loading ? "Loading.." : "Reset Password"}</button>
        <Link href={"/signin"} style={{fontSize:"15px",color:"darkgray",marginTop:"10px"}}>
        Back To LoginPage
        </Link>
      </form>
      {message  && <p style={{textAlign:"center",fontSize:"20px",color:"red"}}>{message}</p>}
    </div>
    </>
  );
}
