"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function SignInForm() {
  const [email, setemail] = useState(null);
  const [pass, setpass] = useState(null);
  const [error, seterror] = useState(null);
  const [loading, setloading] = useState(false);
  const router = useRouter();

  const handlesubmit = async (eo) => {
    eo.preventDefault();
    seterror(null);
    setloading(true);

    if (!email || !pass) {
      seterror("All inputs must be filled");
      setloading(false);
      return;
    }
    const res = await signIn("credentials", {
      email,
      pass,
      redirect: false,
    });

    if (!res.ok) {
      seterror("wrong email or password");
      setloading(false);
      return;
    } else {
      eo.target.reset();
      router.push("/");
      setloading(false);
    }
  };

  return (
    <>
      <form onSubmit={handlesubmit}>
        <div className="input-group">
          <input
            type="text"
            placeholder=" "
            id="email"
            onChange={(eo) => {
              setemail(eo.target.value);
            }}
          />
          <label htmlFor="email">Email :</label>
        </div>
        <div className="input-group">
          <input
            type="password"
            placeholder=" "
            id="pass"
            onChange={(eo) => {
              setpass(eo.target.value);
            }}
          />
          <label htmlFor="pass">Password :</label>
        </div>

        <button>{loading ? "loading.." : "Login"}</button>
        <p>
          Donot have an account ?<Link href={"/register"}>Register</Link>
        </p>
      </form>

      <p style={{ color: "red", textAlign: "center" }}>{error}</p>
    </>
  );
}
