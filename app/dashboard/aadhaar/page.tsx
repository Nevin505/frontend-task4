'use client'

import Card from "@/components/ui/Card/card"
import useInput from "@/hooks/useInput";

import Input from "@/components/ui/input";

import aadhaarPageStyles from './aadhaarStyles.module.css';
import Button from "@/components/ui/button";
import { regexPatternValidation, truthyValue } from "@/app/lib/valdiation";
import { useState } from "react";
import useSessionStorage from "@/hooks/useSessionStorage";
import { aadhaarVerificationURL } from "@/Services/Api/Verification";
import axios from "axios";

const AadhaarVerificationPage = () => {

// Custom hook to manage Aadhaar card input state and validation
  const aadhaarCard=useInput('');

  // Retrieve userId from session storage
  const userId=useSessionStorage('userId');

  const[isLoading,setIsLoading]=useState(false);

  const aadhaarRegexPattern:RegExp=/^\d{12}$/

// State to manage API response message
  const[apiResponseMessage,setApiResponseMessage]=useState<string | null>('');

  // Determine if the send button should be visible based on Aadhaar input validation
  const isSendButtonVisible =truthyValue(aadhaarCard.inputValue) && regexPatternValidation(aadhaarRegexPattern,aadhaarCard.inputValue)

   // Check if the Aadhaar number is invalid and return corresponding error messages
  const isAadhaarNumberInValid= aadhaarCard.didEdit && (!truthyValue(aadhaarCard.inputValue)?"Aadhaar Number Can't Be Empty":!regexPatternValidation(aadhaarRegexPattern,aadhaarCard.inputValue)?'Enter a Valid Aadhaar Number':'');


    // Function to handle Aadhaar verification
  const handleAadhaarVerfication=async()=>{
     setIsLoading(true)
        try{
          const reqBody={userId,aadhaar:aadhaarCard.inputValue}
             // Make an API call to verify the Aadhaar number
             const response=await axios.post(aadhaarVerificationURL,reqBody)
             console.log(response)
             if(response.status===200){
               sessionStorage.setItem('isAadhaarVerified','true')
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
             console.log(error.response.data.message)
        }
        finally{
         setIsLoading(false)
        }
  }

  return (
      <Card>
        <h1 className={aadhaarPageStyles.mainHeading}>Aadhaar Card Verification</h1>
         <Input value={aadhaarCard.inputValue} handleChange={aadhaarCard.handleChange }  handleBlur={aadhaarCard.handleBlur} placeholder="Enter Your Aadhar Card Number" error={isAadhaarNumberInValid}/>
          {/* Show the verify button only if the input is valid and not loading */}
         {isSendButtonVisible && <Button onClick={handleAadhaarVerfication} isDisabled={isLoading}>{isLoading?'Verifying':'Verfiy'}</Button>}
          {/* Display the API response message if there is */}
     {apiResponseMessage && <p>{apiResponseMessage}</p>}
      {/* Display error guidelines if Aadhaar number is invalid */}
      {isAadhaarNumberInValid &&
       <span className={aadhaarPageStyles.gstinGuidelines}>**12-digit Numeric code</span>}
      </Card>
  )
}

export default AadhaarVerificationPage
