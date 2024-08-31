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


const gstinRegex:RegExp = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;

const AddGstPage = () => {
    const gstInNumber=useInput("");

    const userId=useSessionStorage('userId');

    const[isLoading,setIsLoading]=useState(false);

    const[apiResponseMessage,setApiResponseMessage]=useState<string | null>('');

    const isSendButtonVisible =truthyValue(gstInNumber.inputValue) && regexPatternValidation(gstinRegex,gstInNumber.inputValue)

    const isgstInNumberInValid= gstInNumber.didEdit && (!truthyValue(gstInNumber.inputValue)?"GSTIN Number Can't Be Empty":!regexPatternValidation(gstinRegex,gstInNumber.inputValue)?'Enter a Valid GSTIN Number':'');


  // to GstIn Verifcation Handler
  const handleGstVerfication=async()=>{
    setIsLoading(true)
       try{
           const reqBody={ gstinNumber:gstInNumber.inputValue ,userId}
            const response=await axios.post(gstinVerificationURL,reqBody)
            console.log(response)
            if(response.status===200){
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
            console.log(error.response.data.message)
       }
       finally{
        setIsLoading(false)
       }
  }
  
  return (
    // <div className={gstPageStyles.gstContainer}>
    //   <div className={gstPageStyles.gstInputVerification}>
    <Card>
        <h1>Goods and Services Tax Identification Number</h1>
      <Input type="text" error={isgstInNumberInValid} value={gstInNumber.inputValue} handleChange={gstInNumber.handleChange} handleBlur={gstInNumber.handleBlur} placeholder="Enter Your Gstin Number" />
      {isSendButtonVisible && <Button onClick={handleGstVerfication}>{isLoading?'Verifying':'Verfiy'}</Button>}
     {apiResponseMessage && <p>{apiResponseMessage}</p>}
      {isgstInNumberInValid &&
       <span className={gstPageStyles.gstinGuidelines}>**15-digit alphanumeric code</span>}
       </Card>
    //   </div>
    // </div>
  )
}

export default AddGstPage;
