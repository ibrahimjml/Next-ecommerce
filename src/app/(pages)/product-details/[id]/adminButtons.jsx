"use client"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function AdminButtons({ProductId}) {

  const [error,seterror] = useState(null);
  const [loading,setloading] =useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  const handledelete = async (eo) => {
    seterror(null)
    setloading(true);

    const response = await fetch("http://localhost:3000/api/deleteproduct", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ProductId}),
    });

    if(response.ok){
      setloading(false);
      router.push("/");
    }else{
      setloading(false)
      seterror("error deleting post,try again")
    }

    setloading(false)
  };
  
  if (!session || session.user.role !== 'admin') {
    return null; 
  }

  return (
    <div style={{display:"flex",justifyContent:"center",gap:"1rem",marginTop:"3rem"}}>

        <Link href={`/update-product/${ProductId}`} className='update-product'>
        <FontAwesomeIcon style={{width:"1rem"}} icon={faPen}/>
         Edit product
        </Link>

        <button className='delete-product' onClick={handledelete}>
        <FontAwesomeIcon style={{width:"1rem"}} icon={faTrash}/>
        {loading ? "Loading.."  : "Delete Product"}
        </button>
        <p>{error}</p>
      </div>
  )
}
