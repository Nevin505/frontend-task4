"use client"
import Button from "@/components/ui/button";
import Card from "@/components/ui/Card/card"
import Input from "@/components/ui/input"
import useInput from "@/hooks/useInput"

import addressLookUpStyles from './addressLookUp.module.css';
import Image from "next/image";
import { useState } from "react";
import { regexPatternValidation, truthyValue } from "@/app/lib/valdiation";
import axios from "axios";
import useSessionStorage from "@/hooks/useSessionStorage";
import { pinCodeVerificationURL } from "@/Services/Api/Verification";

const AddressLookUpPage = () => {
  const pinCodeInputField=  useInput();

  const[isLoading,setIsLoading]=useState(false);

//  const userId= useSessionStorage('userId')

  const pinCodeRegex:RegExp = /^[1-9][0-9]{5}$/; // Matches a 6-digit numeric PIN code starting with a non-zero digit


// State to manage API response message
  const[apiResponseMessage,setApiResponseMessage]=useState<string | null>('');

  // Determine if the send button should be visible based on Aadhaar input validation
  const isSendButtonVisible =truthyValue(pinCodeInputField.inputValue) && regexPatternValidation(pinCodeRegex,pinCodeInputField.inputValue)

   // Check if the Aadhaar number is invalid and return corresponding error messages
  const isPinCodeInValid= pinCodeInputField.didEdit && (!truthyValue(pinCodeInputField.inputValue)?"Pincode Can't Be Empty":!regexPatternValidation(pinCodeRegex,pinCodeInputField.inputValue)?'Enter a Valid Pincode':'');


    // Function to handle Aadhaar verification
  const handleAadhaarVerfication=async()=>{
     setIsLoading(true)
        try{
          // const reqBody={userId,pinCode:pinCodeInputField.inputValue}
             // Make an API call to verify the Aadhaar number
             const response=await axios.get(`${pinCodeVerificationURL}/${pinCodeInputField.inputValue}`)
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
        <h1 className={addressLookUpStyles.mainHeader}>Address Look Up Page</h1>
       <div className={addressLookUpStyles.searchContainer}>
       <Input value={pinCodeInputField.inputValue} handleChange={pinCodeInputField.handleChange} placeholder="Enter PinCode" handleBlur={pinCodeInputField.handleBlur} error={""}/>
       {isSendButtonVisible &&  <Button   onClick={handleAadhaarVerfication} isDisabled={isLoading} ><Image src="/icons/search.svg" alt="Search Icon" width={20} height={20}/></Button>}
      
       </div>
       {apiResponseMessage && <p>{apiResponseMessage}</p>}
      {/* Display error guidelines if Aadhaar number is invalid */}
      {isPinCodeInValid &&
       <span className={addressLookUpStyles.gstinGuidelines}>**6-digit Numeric code</span>}
      </Card>
  )
}

export default AddressLookUpPage
