"use client";
import React, { useEffect } from "react";
import "./header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Navlink from "./navLink";
import shownav from "./main";

export default function Header({ issignedin = false, isregistered = false }) {
  useEffect(() => {
    shownav();
  }, []);

  return (
    <header id="headerElement" className="flex">
      <div className="logo">
        <Link href={"/"}>
          <FontAwesomeIcon
            style={{ width: "1.5rem" }}
            className="fa-solid fa-bag-shopping"
            icon={faBagShopping}
          />
          <span style={{ fontWeight: "bold" }}>Next</span>
          <p style={{ letterSpacing: "5px", fontWeight: "bold" }}>SHOP</p>
        </Link>
      </div>
      <Navlink isregistered={isregistered} issignedin={issignedin} />
    </header>
  );
}
