import Header from "@/components/Header/header"
import "./update.css"
import Updateform from "./updateform"


export default function Page({params}) {
  return (
    <>
    <Header/>
    <Updateform ProductId={params.id}/>
    </>
  )
}
