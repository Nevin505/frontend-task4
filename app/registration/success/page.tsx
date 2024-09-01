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
  <p>Registration Complete</p>
  <p>Login To Complete the Verifications</p>
  <p className={succesStyles.additionalInfo}>
    Thank you for registering! Please log in to verify your account and gain access to all features.
  </p>
  <button className={succesStyles.button} onClick={naviagteToLogin}>Login</button>
</div>

  )
}

export default page
