"use client"
import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";

import Button from "@/components/ui/button";
import Card from "@/components/ui/Card/card"
import Input from "@/components/ui/input"
import useInput from "@/hooks/useInput"
import { LocationData } from "@/types/Cutsomtypes";

import useSessionStorage from "@/hooks/useSessionStorage";
import { pinCodeVerificationURL } from "@/Services/Api/Verification";
import { regexPatternValidation, truthyValue } from "@/app/lib/valdiation";

import addressLookUpStyles from './addressLookUp.module.css';
import { pinCodeRegex } from "@/app/lib/RegexPattern";
import { useRouter } from "next/navigation";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddressLookUpPage = () => {
  const pinCodeInputField=  useInput('');

  const[isLoading,setIsLoading]=useState(false);

  const[address,setAddress]=useState<LocationData>({} as LocationData)

// State to manage API response message
  const[apiResponseMessage,setApiResponseMessage]=useState<string | null>('');

  const router =useRouter();


  useEffect(() => {
    // Check if Aadhaar is not verified
    if (!sessionStorage.getItem('isAadhaarVerified')) {
      toast('Verify Aadhaar.Navigating to Aadhaar Verification')
      // Redirect to the home page after a short delay
      const timeInterval = setTimeout(() => {
        router.push('/dashboard/aadhaar'); // Navigate to the home page or any other desired route
      }, 4000); // 1-second delay before redirecting 
      // Cleanup function to clear the timeout
      return () => {
        clearTimeout(timeInterval);
      };
    }
  }, [router]);
  // Determine if the send button should be visible based on Address input validation
  const isSendButtonVisible =truthyValue(pinCodeInputField.inputValue) && regexPatternValidation(pinCodeRegex,pinCodeInputField.inputValue)

   // Check if the Address number is invalid and return corresponding error messages
  const isPinCodeInValid= pinCodeInputField.didEdit && (!truthyValue(pinCodeInputField.inputValue)?"Pincode Can't Be Empty":!regexPatternValidation(pinCodeRegex,pinCodeInputField.inputValue)?'Enter a Valid Pincode':'');

    // Function to handle Address verification
  const handleAddressLookUp=async()=>{
     setIsLoading(true)
     setAddress({}as LocationData)
        try{
             // Make an API call Get the Pincode Details
             const response=await axios.get(`${pinCodeVerificationURL}/${pinCodeInputField.inputValue}`)
             console.log(response)
             if(response.status===200){
               setAddress(response.data)
               setApiResponseMessage("Data Fetched")
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
        <h1 className={addressLookUpStyles.mainHeader}>Address Look Up Page</h1>
       <div className={addressLookUpStyles.searchContainer}>
       <Input value={pinCodeInputField.inputValue} handleChange={pinCodeInputField.handleChange} placeholder="Enter PinCode" handleBlur={pinCodeInputField.handleBlur} error={""}/>
       {isSendButtonVisible &&  <Button   onClick={handleAddressLookUp} isDisabled={isLoading} ><Image src="/icons/search.svg" alt="Search Icon" width={20} height={20}/></Button>}
      
       </div>
  {/* To Display the Loading State */}
  {isLoading && <span className={addressLookUpStyles.loadingMessage}>Data is Being Fetched...</span>}
  {apiResponseMessage && <span>{apiResponseMessage}</span>}
  {address.area && 
  <div className={addressLookUpStyles.responseContainer}>
    <p className={addressLookUpStyles.responseItem}><strong>City:</strong> {address.area}</p>
    <p className={addressLookUpStyles.responseItem}><strong>District:</strong> {address.district}</p>
    <p className={addressLookUpStyles.responseItem}><strong>Pincode:</strong> {address.pincode}</p>
    <p className={addressLookUpStyles.responseItem}><strong>State:</strong> {address.state}</p>
  </div>
}

      {/* Display error guidelines if Aadhaar number is invalid */}
      {isPinCodeInValid &&
       <span className={addressLookUpStyles.gstinGuidelines}>**6-digit Numeric code</span>}
        <ToastContainer />
      </Card>
  )
}

export default AddressLookUpPage
