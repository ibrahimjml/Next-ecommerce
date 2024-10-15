"use client";
import "./page.css";
import Footer from "@/app/components/Footer/footer";
import Products from "./products";
import SliderImage from "@/app/components/sliderImages/page";

export default function Home() {
  
  return (
    <>
      <SliderImage />
      <main style={{ marginBottom: "10px" }}>
        
          <Products />
      
      </main>
      <Footer />
    </>
  );
}
