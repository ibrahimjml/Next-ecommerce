import React from 'react'
import Header from '@/app/components/Header/header'
import SigninForm from './SigninForm'
import "./signin.css"
import Square from '@/app/components/square-animation/square'

export default function page() {
  return (
    <>
    <Header issignedin={true} style={{backgroundColor:"transparent"}}/>
      <section style={{zIndex:"20",position:"relative"}}>
  <h1>WELCOME</h1>
  <h3>TO</h3>
  <h3>NEXT SHOP</h3>
  <SigninForm/>
</section>
        <Square/>
</>
  )
}
