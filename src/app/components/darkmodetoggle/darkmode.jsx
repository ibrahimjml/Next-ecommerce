"use client"
import { useContext } from "react";
import  "./darkmodetoggle.css"
import { ThemeContext } from "@/app/context/ThemeContext";
const Darkmodetoggle=()=>{
  const {mode,toggle}= useContext(ThemeContext)
  return(
    <div className="container" onClick={toggle}>
      <div className="icons">🌙</div>
      <div className="icons">🌚</div>
      <div 
      className="switcher"
      style={mode === "light" ? {left: "2px"} : {right :"2px"}}
      />
    </div>
  )
}
export default Darkmodetoggle;