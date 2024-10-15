"use client";
import Image from "next/image";
import "./page.css";
import Header from "@/app/components/Header/header";
import { useState, useEffect } from "react";

const slides = [
  {
    id: 1,
    title: "Lifestyle collection",
    subtitle: "Men",
    description: "SALE UP TO",
    img: "/images/bac.jpg",
    sale: "30%",
    color: "black",
  },
  {
    id: 2,
    title: "Winter Collection",
    subtitle: "Men",
    description: "SALE UP TO",
    img: "/images/shopping guide hero 08102021.webp",
    sale: "50%",
    color: "black",
  },
  {
    id: 3,
    title: "Summer Collection",
    subtitle: "Men",
    description: "SALE UP TO",
    img: "/images/360_F_655482254_1k1yrQACCvforJsBqcLgQgJAuoPSzg3X.jpg",
    sale: "77%",
    color: "white",
  },
];

function Page() {
  const [current, setcurrent] = useState(0);

  useEffect(() => {
    const intervel = setInterval(() => {
      setcurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(intervel);
  }, []);
  return (
    <>
      <Header />
      <div className="slider-container">
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="top-img"
            style={{
              color: `${slide.color}`,
              transition: "all ease-in-out 1s",
              transform: `translateX(-${current * 100}vw)`,
            }}
          >
              
            <Image
              className="img"
              src={slide.img}
              alt={""}
              width={900}
              height={900}
              priority={true}
            />
            <section className="content">
              <p className="lifestyle">{slide.title}</p>
              <p className="men">{slide.subtitle}</p>
              <p className="sale">
                {slide.description}
                <span>{slide.sale} OFF</span>
              </p>
              <p className="free-shipping">
                Get Free Shipping on orders over $99.00
              </p>
              <button>Shop Now</button>
            </section>
          </div>
        ))}
      </div>

      <div
        style={{
          position: "absolute",
          left: "50%",
          bottom: "8px",
          display: "flex",
          gap: "5px",
        }}
      >
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`circle ${current === index ? "scale" : ""}`}
            onClick={() => {
              setcurrent(index);
            }}
          >
            {current === index && <div className="incircle"></div>}
          </div>
        ))}
      </div>
    </>
  );
}

export default Page;
