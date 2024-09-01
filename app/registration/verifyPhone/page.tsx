"use client"
import axios from 'axios';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import useInput from "@/hooks/useInput"
import useSessionStorage from "@/hooks/useSessionStorage";

import OtpInput from "@/components/ui/OtpField/otpInput";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input"

import { regexPatternValidation, truthyValue } from "@/app/lib/valdiation";
import CalendarInput from '../../../components/ui/calendarButton/calendarInput'

import { sendPhoneOtp, verifyPhoneOtp } from "@/Services/Api/Registration";

import verifyStyles from './verifyPhone.module.css'




const Page = () => {

    // Regex Pattern
    const phoneNumberRegexPattern=/^\d{10}$/
    // {inputValue,handleChange,handleBlur,didEdit}
  
   const route= useRouter();

    const  phoneNumber=useInput("");


    const OtpNumber=useInput("");
    
    const userId=useSessionStorage('userId')
  // Indicating the Dealay in Sending the Otp
    const[isSending,setIsSendding]=useState(false);

  const[isOtpBoxVisible,setOtpBoxVisible]=useState(false);

  const[verificationMessage,setVerificationMessage]=useState<boolean|null>(null);



    
    const showVerfiyButton=(truthyValue(phoneNumber.inputValue)&&regexPatternValidation(phoneNumberRegexPattern,phoneNumber.inputValue));

    const isPhoneNumberInValid=phoneNumber.didEdit &&( !truthyValue(phoneNumber.inputValue)?"Phone Number Can't Be Empty":!regexPatternValidation(phoneNumberRegexPattern,phoneNumber.inputValue)?'Enter a Valid Phone Number':'');

  const initiatePhoneOtpHanlder=async()=>{
    setOtpBoxVisible(true)
    setIsSendding(true);
    try{
       const response= await axios.post(sendPhoneOtp,{userId,phoneNumber:phoneNumber.inputValue},  {
        withCredentials: true // Include credentials (such as cookies) in the request
      });
       console.log("Clicked");
       if(response.status!==200){
        throw new Error("Some Error Occurred")
       }
    }
    catch(error){
         alert("Some Error Occureed")
    }
    finally{
    setIsSendding(false);
 
  }
}

  const verifyPhoneOtpHandler=async()=>{
    
    try{
    const response= await axios.patch(verifyPhoneOtp,{userId,OtpNumber:OtpNumber.inputValue,phoneNumber:phoneNumber.inputValue}  , {
        withCredentials: true // Include credentials (such as cookies) in the request
      });
      if(response.status!==200){
          throw new Error("Something Went Wrong")
      }
      setVerificationMessage(true)
      // route.push('/registration/success')
      console.log(response);
        }
               catch(error){
      setVerificationMessage(false)

            console.log(error)     
           } 


  }

  
// Navigate to the next page
  const handleNavigation=()=>{
     if(verificationMessage){
      route.push('/registration/success')
     }
     else{
      alert("Fill the Details")
     }
  }

  return (
    <div className={verifyStyles.verifyContainer}>

      {/* the Phone Verification Section */}
            <div className={verifyStyles.phoneVerficationConatiner}>
            <Input startIcon="/icons/phoneSvg.svg"  placeholder="Enter the Phone Number" value={phoneNumber.inputValue} handleChange={phoneNumber.handleChange}  handleBlur={phoneNumber.handleBlur}  error={isPhoneNumberInValid}  />
            {  showVerfiyButton && <button className={verifyStyles.verify} onClick={initiatePhoneOtpHanlder} >{isSending?"Sending":"Send otp"}</button>}
            </div>

          { isOtpBoxVisible && <OtpInput isSuccess={verificationMessage} message={verificationMessage}  onClick={verifyPhoneOtpHandler} onChange={OtpNumber.handleChange} inputValue={OtpNumber.inputValue}/> }

      {/* Ok Button */}

      <Button className={verifyStyles.customButtonStyles}  onClick={handleNavigation}>Next</Button>

       
    </div>
  )
}

export default Page;
