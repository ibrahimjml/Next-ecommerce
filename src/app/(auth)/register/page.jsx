import Header from "@/app/components/Header/header";
import React from "react";
import ResgisterForm from "./ResgisterForm";
import "./register.css";
import Square from "@/app/components/square-animation/square";

export default function page() {
  return (
    <>
      <Header isregistered={true} />
      <section style={{ zIndex: "20", position: "relative" }}>
        <h1>User Registration Form</h1>
        <ResgisterForm />
      </section>
      <Square />
    </>
  );
}
