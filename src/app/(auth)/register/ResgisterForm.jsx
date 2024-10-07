"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Resgisterform() {
  const [name, setname] = useState(null);
  const [email, setemail] = useState(null);
  const [pass, setpass] = useState(null);
  const [confpass, setconfpass] = useState(null);
  const [error, seterror] = useState(null);
  const [loading, setloading] = useState(false);
  const router = useRouter();

  const handlesubmit = async (eo) => {
    eo.preventDefault();
    seterror(null);
    setloading(true);

    if (!name || !email || !pass || !confpass) {
      seterror("All inputs must be filled");
      setloading(false);
      return;
    } else if (pass !== confpass) {
      seterror("Password not match");
      setloading(false);
      return;
    }
    //creating strong pass
    const regPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

  if (!regPassword.test(pass)) {
    setloading(false);
    seterror(
      "Password must be at least 8 characters with 1 uppercase, 1 lowercase, 1 special character and 1 numeric."
    );
    return;
  }

    //check email exist in db
    const resuserexist = await fetch("api/userexist", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const isuserexist = await resuserexist.json();
    if (isuserexist.user) {
      seterror("Email already exist");
      setloading(false);
      return;
    }
    //store data in db
    const response = await fetch("api/register", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, pass, confpass }),
    });

    if (response.ok) {
      eo.target.reset();
      router.push("/signin");
    } else {
      seterror("");
    }
  };
  return (
    <>
      <form onSubmit={handlesubmit}>
        <div className="input-group">
          <input
            type="text"
            id="user"
            placeholder=" "
            onChange={(eo) => {
              setname(eo.target.value);
            }}
          />
          <label htmlFor="user">Username :</label>
        </div>
        <div className="input-group">
          <input
            type="text"
            placeholder=" "
            autoComplete="yes"
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
        <div className="input-group">
          <input
            type="password"
            placeholder=" "
            id="conf-pass"
            onChange={(eo) => {
              setconfpass(eo.target.value);
            }}
          />
          <label htmlFor="conf-pass">Confirm Password :</label>
        </div>
        <button type="submit">{loading ? "loading.." : "Register"}</button>
        <p>
          Allready have an account ?<Link href={"/signin"}>Login</Link>
        </p>
      </form>
      <p style={{ color: "red", textAlign: "center" }}>{error}</p>
    </>
  );
}
