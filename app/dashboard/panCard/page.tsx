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
import { panRegexPattern } from "@/app/lib/RegexPattern"

const PanCardPage = () => {
  // Custom hook to manage Pan Card details input state and validation
  const panCardDetails=useInput('');
   // Retrieve userId from session storage
  const userId=useSessionStorage('userId');
  const[apiResponseMessage,setApiResponseMessage]=useState<string | null>('');
  const[isLoading,setIsLoading]=useState<boolean>(false);

// Determine if the send button should be visible based on Pan Card input validation
  const isSendButtonVisible =truthyValue(panCardDetails.inputValue) && regexPatternValidation(panRegexPattern,panCardDetails.inputValue)

    // Check if the Pan Card number is invalid and return corresponding error messages
  const isgstInNumberInValid= panCardDetails.didEdit && (!truthyValue(panCardDetails.inputValue)?"PanCard Number Can't Be Empty":!regexPatternValidation(panRegexPattern,panCardDetails.inputValue)?'Enter a Valid PanCard Number':'');

   // Function to handle Pan Card verification
  const handlePanVerfication=async()=>{
    setIsLoading(true)
    try{
        // Prepare the request body with userId and Pan Card details
        const reqBody={ userId,panCard:panCardDetails.inputValue}
         const response=await axios.patch(panCardVerificationURL,reqBody)
         console.log(response)
         // If the response is successful, store verification status in session storage and set response message
         if(response.status===200){
          sessionStorage.setItem('isPanVerified','true');
           setApiResponseMessage(response.data.message)
         }
    }
    catch(error:any){
     console.log(error);
     // Handle errors and set appropriate error messages
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
        {/* Input field for Pan Card number with validation */}
      <Input value={panCardDetails.inputValue} handleChange={panCardDetails.handleChange } placeholder="Enter Your Pan Details" handleBlur={panCardDetails.handleBlur} error={isgstInNumberInValid}/>
      {isSendButtonVisible && <Button isDisabled={isLoading} onClick={handlePanVerfication}>{isLoading?'Verifying':'Verfiy'}</Button>}
     {apiResponseMessage && <p>{apiResponseMessage}</p>}
      {/* Display error guidelines if Pan Card number is invalid */}
      {isgstInNumberInValid &&
       <span className={panCardStyles.panCardGuidelines}>**10-digit alphanumeric code</span>}
    </Card>
  )
}

export default PanCardPage
