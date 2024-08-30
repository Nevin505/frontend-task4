"use client"
import { useRouter } from "next/navigation"

import Button from "@/components/ui/button";

import succesStyles from './sucess.module.css'

const page = () => {
   const route= useRouter();

   const naviagteToLogin=()=>{
    route.push('/')
   }
  return (
    <div className={succesStyles.sucessInfoContainer}>
        <p>Registration Complete|</p>
        <p>Login To Complete the Verfications</p>
        <Button onClick={naviagteToLogin}>Login</Button>
    </div>
  )
}

export default page
