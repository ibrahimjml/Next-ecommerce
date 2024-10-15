import React from 'react'
import './footer.css'
import Socail_media from "./data.js"
import Image from 'next/image'
import Link from 'next/link'
export default function Footer() {
  return (
    <footer>
    <div>
        Designed and developed by
        <span> Ibrahim Jamal </span>© 2024.
    </div>
    <div>
      <p>follow me for more projects </p>
      <div className="socail-media">
      {Socail_media.map((item)=>{
        return (
          
          <Link key={item.id} href={item.href} target='_blank'>
          <Image 
          src={item.media}
          alt={item.title}
          width={28}
          height={28}
          quality={100}
          />
          </Link>
        )
      })}
      </div>
    </div>
    </footer>
  )
}
