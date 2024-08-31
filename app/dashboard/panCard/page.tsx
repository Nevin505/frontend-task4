'use client'
import { useState } from "react"
import axios from "axios"

import Input from "@/components/ui/input"
import useInput from "@/hooks/useInput"
import useSessionStorage from "@/hooks/useSessionStorage"
import Card from "@/components/ui/Card/card"
import Button from "@/components/ui/button"

import { regexPatternValidation, truthyValue } from "@/app/lib/valdiation"
import {panCardVerificationURL } from "@/Services/Api/Verification"

import panCardStyles from './panCardPage.module.css'

const PanCardPage = () => {

  const panCardDetails=useInput('');
  const userId=useSessionStorage('userId');
  const[apiResponseMessage,setApiResponseMessage]=useState<string | null>('');
  const[isLoading,setIsLoading]=useState<boolean>(false);

  const panRegex: RegExp = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

  // const isgstInNumberInValid=

  const isSendButtonVisible =truthyValue(panCardDetails.inputValue) && regexPatternValidation(panRegex,panCardDetails.inputValue)

  const isgstInNumberInValid= panCardDetails.didEdit && (!truthyValue(panCardDetails.inputValue)?"PanCard Number Can't Be Empty":!regexPatternValidation(panRegex,panCardDetails.inputValue)?'Enter a Valid PanCard Number':'');

  const handlePanVerfication=async()=>{
    setIsLoading(true)
    try{
      console.log('Clicked');
      
        const reqBody={ userId,panCard:panCardDetails.inputValue}
         const response=await axios.post(panCardVerificationURL,reqBody)
         console.log(response)
         if(response.status===200){
          sessionStorage.setItem('isPanVerified','true');
           setApiResponseMessage(response.data.message)
         }
    }
    catch(error:any){
     console.log(error);
     if(error.response){
       const errorMessage = error.response.data?.message || "An error occurred.";
       setApiResponseMessage(errorMessage)

     }
     else{
       setApiResponseMessage("An unexpected error occurred. Please try again later.")
     }
         console.log(error.response?.data?.message)
    }
    finally{
     setIsLoading(false)
    }


  }
  return (
    <Card>
      <h1 className={panCardStyles.mainHeading}>Permanent Account Number(Pan) Card Verification</h1>
      <Input value={panCardDetails.inputValue} handleChange={panCardDetails.handleChange } placeholder="Enter Your Pan Details" handleBlur={panCardDetails.handleBlur} error={isgstInNumberInValid}/>
      {isSendButtonVisible && <Button isDisabled={isLoading} onClick={handlePanVerfication}>{isLoading?'Verifying':'Verfiy'}</Button>}
     {apiResponseMessage && <p>{apiResponseMessage}</p>}
      {isgstInNumberInValid &&
       <span className={panCardStyles.panCardGuidelines}>**10-digit alphanumeric code</span>}
    </Card>
  )
}

export default PanCardPage
