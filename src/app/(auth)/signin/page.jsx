import React from 'react'
import Header from '@/app/components/Header/header'
import SigninForm from './SigninForm'
import "./signin.css"
import Square from '@/app/components/square-animation/square'

export default function page() {
  return (
    <>
    <Header issignedin={true} />
      <section style={{zIndex:"20",position:"relative"}}>
      <h1>User Login Form</h1>
  <SigninForm/>
</section>
        <Square/>
</>
  )
}
