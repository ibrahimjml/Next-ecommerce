"use client";
import "./page.css";
import Footer from "@/app/components/Footer/footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import Products from "./products";
import Sliderimage from "@/app/components/sliderImages/page";

export default function Home() {
  
  return (
    <>
      <Sliderimage />
      <main style={{ marginBottom: "10px" }}>
        <h1 className="recommended">
          <FontAwesomeIcon
            style={{ width: "2rem" }}
            className="fa-solid fa-check"
            icon={faCheck}
          />
          Recommended for you
        </h1>
        
          <Products />
      
      </main>
      <Footer />
    </>
  );
}
