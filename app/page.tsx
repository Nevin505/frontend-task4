'use client'

import Link from "next/link";
import axios from 'axios';
import { useRouter } from "next/navigation";
import { useState } from "react";

import Input from "@/components/ui/input";
import useInput from "@/hooks/useInput";
import Button from "@/components/ui/button";

import { regexPatternValidation, truthyValue } from "./lib/valdiation";

import {authenticateUser} from  '../Services/Api/User'

import pageStyles from './page.module.css'


const mailRegexPattern=/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

const passwordRegexPattern=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=\-{}\[\]:;"'<>,.?~`])[A-Za-z\d!@#$%^&*()_+=\-{}\[\]:;"'<>,.?~`]{8,}$/

export default function Home() {

  const routes=useRouter();

 const email= useInput("");

 const password= useInput("");

 
 const[isLoading,setIsLoading]=useState(false);

// State to manage API response message
 const[apiResponseMessage,setApiResponseMessage]=useState<string | null>('');

 const isUserEmailInValid= email.didEdit && (!truthyValue(email.inputValue)?"Email Can't Be Empty":!regexPatternValidation(mailRegexPattern,email.inputValue)?'Enter a Valid Email':'');

 const isUserPaswordInValid= password.didEdit && (!truthyValue(password.inputValue)?"Password Can't Be Empty":!regexPatternValidation(passwordRegexPattern,password.inputValue)?'Enter a Valid Password':'');


//  To Login User
const handleUserAuthentication=async()=>{
try{
  const response=  await axios.post(authenticateUser,{email:email.inputValue,password:password.inputValue});
  if(response.status==200){
   sessionStorage.setItem('userId',response.data.id)
   routes.push('/dashboard')
  }
}
catch(error:any){
  if(error?.response?.data?.message){
    setApiResponseMessage(error.response.data.message)
  }
  else{
    setApiResponseMessage("Some UnExpected Events Occurred!Please Try Again After Sometime")
  }
  console.log(error)
}
}

  return (
        <main  className={pageStyles.mainContainer}>
           <h1>Hi Welcome</h1>
          <Input  value={email.inputValue}  startIcon="/icons/emailIcon.svg"  error={isUserEmailInValid} placeholder="Enter E-mail" handleBlur={email.handleBlur}  handleChange={email.handleChange} />
          <Input  value={password.inputValue}  startIcon="/icons/passwordSvg.svg"  error={isUserPaswordInValid} placeholder="Enter Password" handleBlur={password.handleBlur}  handleChange={password.handleChange} />

          <Button onClick={handleUserAuthentication}>Login</Button>
           {/* Conditionally render the API response message */}
      {apiResponseMessage && (
        <p className={pageStyles.apiResponseMessage}>
          {apiResponseMessage}
        </p>
      )}
            <p className={pageStyles.registrationInfo}>Are You a New User?<Link href='/registration' className={pageStyles.registerNavigateLink}>Register </Link></p>

        </main>
  );
}
