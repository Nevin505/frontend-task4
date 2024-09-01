'use client'
import axios from "axios"
import { useState } from "react"
import useSessionStorage from "@/hooks/useSessionStorage"
import useInput from "@/hooks/useInput"

import Input from "@/components/ui/input"
import Card from "@/components/ui/Card/card"
import Button from "@/components/ui/button"

import { regexPatternValidation, truthyValue } from "@/app/lib/valdiation"

import bankDetailsStyles from './bankDetails.module.css'
import { bankAccountVerificationURL } from "@/Services/Api/Verification"

const BankingAccountPage = () => {

  const bankAccountDetails=useInput();

  const bankIFSCNumber=useInput();


     // Retrieve userId from session storage
     const userId=useSessionStorage('userId');

     // State to manage loading status during API call
    const[isLoading,setIsLoading]=useState(false);

    const[apiResponseMessage,setApiResponseMessage]=useState<string | null>('');

    const bankAccountRegexPattern:RegExp=/^\d{8,16}$/;

    const bankIFSCRegexPattern:RegExp=/^[A-Z]{4}0[A-Z0-9]{6}$/

    // Determine if the send button should be visible based on bankAccountNumber,Ifsc code input validation
    const isSendButtonVisible =(truthyValue(bankAccountDetails.inputValue) && regexPatternValidation(bankAccountRegexPattern,bankAccountDetails.inputValue))&&(truthyValue(bankIFSCNumber.inputValue) && regexPatternValidation(bankIFSCRegexPattern,bankIFSCNumber.inputValue))



     // Check if the GSTIN number is invalid and return corresponding error messages
    const isAccounNumberInValid= bankAccountDetails.didEdit && (!truthyValue(bankAccountDetails.inputValue)?"Account  Number Can't Be Empty":!regexPatternValidation(bankAccountRegexPattern,bankAccountDetails.inputValue)?'Enter a Valid BankAccount Number':'');

    const isIFSCInValid= bankIFSCNumber.didEdit && (!truthyValue(bankIFSCNumber.inputValue)?"Account  Number Can't Be Empty":!regexPatternValidation(bankIFSCRegexPattern,bankIFSCNumber.inputValue)?'Enter a Valid BankAccount Number':'');

    const handleBankAccountVerfication=async()=>{
      console.log('Clicked')
      setIsLoading(true)
         try{
          // bankAccountNumber,bankIfscCode
           // Prepare the request body with GSTIN number and userId
             const reqBody={ bankAccountNumber:bankAccountDetails.inputValue,bankIfscCode:bankIFSCNumber.inputValue,userId}
              const response=await axios.patch(bankAccountVerificationURL,reqBody)
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
              console.log(error.response.data.message)
         }
         finally{
          setIsLoading(false)
         }
    }
  return (
   <Card>
      <h1 className={bankDetailsStyles.mainHeading}>Bank Account Details</h1>
      <Input type="text" error={isAccounNumberInValid} value={bankAccountDetails.inputValue} handleChange={bankAccountDetails.handleChange} handleBlur={bankAccountDetails.handleBlur} placeholder="Enter Your Bank Account Number" />
      <Input type="text" error={isIFSCInValid} value={bankIFSCNumber.inputValue} handleChange={bankIFSCNumber.handleChange} handleBlur={bankIFSCNumber.handleBlur} placeholder="Enter Your Bank IFSC Code" />
      {/* Show the verify button only if the input is valid and not loading */}
      {isSendButtonVisible && <Button onClick={handleBankAccountVerfication} isDisabled={isLoading}>{isLoading?'Verifying':'Verfiy'}</Button>}
     {apiResponseMessage && <p>{apiResponseMessage}</p>}
       {/* Display error guidelines if GSTIN number is invalid */}
      {(isAccounNumberInValid || isIFSCInValid) &&
       <span className={bankDetailsStyles.gstinGuidelines}>**15-digit alphanumeric code</span>}
   </Card>
  )
}

export default BankingAccountPage
