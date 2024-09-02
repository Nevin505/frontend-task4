"use client"
import { useState } from "react";

import Input from "@/components/ui/input";
import useInput from "@/hooks/useInput";
import useSessionStorage from "@/hooks/useSessionStorage";

import gstPageStyles from './gstPageStyles.module.css'
import Button from "@/components/ui/button";
import { regexPatternValidation, truthyValue } from "@/app/lib/valdiation";

import {gstinVerificationURL} from '../../../Services/Api/Verification'
import axios from "axios";
import Card from "@/components/ui/Card/card";
import { gstinRegex } from "@/app/lib/RegexPattern";




const AddGstPage = () => {
  // Custom hook to manage GSTIN input state and validation
    const gstInNumber=useInput("");

     // Retrieve userId from session storage
    const userId=useSessionStorage('userId');

     // State to manage loading status during API call
    const[isLoading,setIsLoading]=useState(false);

    const[apiResponseMessage,setApiResponseMessage]=useState<string | null>('');

    // Determine if the send button should be visible based on GSTIN input validation
    const isSendButtonVisible =truthyValue(gstInNumber.inputValue) && regexPatternValidation(gstinRegex,gstInNumber.inputValue)

     // Check if the GSTIN number is invalid and return corresponding error messages
    const isgstInNumberInValid= gstInNumber.didEdit && (!truthyValue(gstInNumber.inputValue)?"GSTIN Number Can't Be Empty":!regexPatternValidation(gstinRegex,gstInNumber.inputValue)?'Enter a Valid GSTIN Number':'');


  // to GstIn Verifcation Handler
  const handleGstVerfication=async()=>{
    if(sessionStorage.getItem('isGstVerified')){
      setApiResponseMessage("Already Verified")
      return;
    }
    setIsLoading(true)
       try{
         // Prepare the request body with GSTIN number and userId
           const reqBody={ gstinNumber:gstInNumber.inputValue ,userId}
            const response=await axios.patch(gstinVerificationURL,reqBody)
            console.log(response)
             // If the response is successful, store verification status in session storage and set response message
            if(response.status===200){
              sessionStorage.setItem('isGstVerified','true')
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
       }
       finally{
        setIsLoading(false)
       }
  }
  
  return (
    <Card>
        <h1 className={gstPageStyles.mainHeading}>Goods and Services Tax Identification Number</h1>
          {/* Input field for GSTIN number with validation */}
      <Input type="text" error={isgstInNumberInValid} value={gstInNumber.inputValue} handleChange={gstInNumber.handleChange} handleBlur={gstInNumber.handleBlur} placeholder="Enter Your Gstin Number" />
      {/* Show the verify button only if the input is valid and not loading */}
      {isSendButtonVisible && <Button onClick={handleGstVerfication} isDisabled={isLoading}>{isLoading?'Verifying':'Verfiy'}</Button>}
     {apiResponseMessage && <p>{apiResponseMessage}</p>}
       {/* Display error guidelines if GSTIN number is invalid */}
      {isgstInNumberInValid &&
       <span className={gstPageStyles.gstinGuidelines}>**15-digit alphanumeric code</span>}
       </Card>

  )
}

export default AddGstPage;
