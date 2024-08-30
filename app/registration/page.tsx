'use client'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import useInput from '@/hooks/useInput.jsx'
import Input from '../../components/ui/input'
import OtpInput from '@/components/ui/OtpField/otpInput';
import Button from '@/components/ui/button';

import {truthyValue,regexPatternValidation}  from '../lib/valdiation.js'

import {saveUser, sendEmailOtp, verifyEmailOtp}  from  '../../Services/Api/Registration'

import registrationPageStyles from './page.module.css';


type RegexPatterns = {
    name:RegExp,
    mail:RegExp
}

const regexPatterns:RegexPatterns={name:/^[A-Za-z\s'-]+$/,mail:/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/}


const passwordRegexPattern=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=\-{}\[\]:;"'<>,.?~`])[A-Za-z\d!@#$%^&*()_+=\-{}\[\]:;"'<>,.?~`]{8,}$/
;

const ResgistrationPage = () => {

    // To Obtain the User Details
   const userName= useInput("");
   const email= useInput("");
   const password= useInput("");
   const OtpNumber=useInput("")


  const[verificationMessage,setVerificationMessage]=useState<boolean|null>(null);

  const[isEmailVerified,setIsEmailVerified]=useState(false)

  const[isOtpBoxVisible,setOtpBoxVisible]=useState(false)

  // to indicate the sending state of the otp
  const[isSending,setIsSendding]=useState(false);

  const  [dateofBirth,setDateofBirth]=useState("");

  const [dateError, setDateError] = useState("");

  const routes=useRouter();


   const handleFormSubmission=(e:React.FormEvent)=>{
       e.preventDefault();
   }

    const showVerfiyButton=(truthyValue(email.inputValue)&&regexPatternValidation(regexPatterns.mail,email.inputValue));
   
    const isUserNameInValid= userName.didEdit && (!truthyValue(userName.inputValue)?"User Can't Be Empty":!regexPatternValidation(regexPatterns.name,userName.inputValue)?'Enter a Valid Value':'');
  
    const isUserEmailInValid= email.didEdit &&( !truthyValue(email.inputValue)?"Email Can't Be Empty":!regexPatternValidation(regexPatterns.mail,email.inputValue)?'Enter a Valid Email':'');


   const isPasswordInValid=password.didEdit &&( !truthyValue(password.inputValue)?"Password Can't Be Empty":!regexPatternValidation(passwordRegexPattern,password.inputValue)?'Enter a Valid Password':'');


    // tO Send the Otp  to the given Phone
    const handleOtpVerification = async () => {
      // Show the OTP input box to the user
      setOtpBoxVisible(true);
    
      // Indicate that the OTP is being sent
      setIsSendding(true);
    
      try {
        // Display a toast notification to the user
        
        // Log the button click action for debugging
    
        // Make an API request to send the OTP to the provided email
        const response = await axios.post(
          sendEmailOtp,  // The API endpoint for sending the OTP
          { email: email.inputValue }, // Data being sent to the server
          {
            withCredentials: true // Include credentials (such as cookies) in the request
          }
        );
    
        // Check if the response status is not 200 (OK)
        if (response.status !== 200) {
          throw new Error("Something Went Wrong"); // Throw an error if the response is not successful
        }
    
      } catch (error) {
        // Show an alert if something goes wrong during the process
        toast("Something Went Wrong");
    
      } finally {
        // Stop indicating that the OTP is being sent, regardless of success or failure
        setIsSendding(false);
      }
    };
    
     // tO Verify if the user Enters the Valid Otp
   // To verify if the user enters the valid OTP
const verifyEmail = async () => {

  // Check if the user has entered an OTP
  if (OtpNumber.inputValue) {
    try {
      // Make an API request to verify the entered OTP
      const otpResponse = await axios.post(
        verifyEmailOtp, // API endpoint for verifying the OTP
        {
          email: email.inputValue, // User's email
          otp: OtpNumber.inputValue // Entered OTP
        },
        {
          headers:{
              "Content-Type":'application/json'
          },
          withCredentials: true // Include credentials (cookies)
        }
      );

      console.log(otpResponse); // Log the response for debugging

      // Check if the response status is not 200 (OK)
      if (otpResponse.status !== 200) {
        throw new Error("Something Went Wrong"); // Throw an error if the response is not successful
      }

      // Set the email verification status to true if OTP is correct
      setIsEmailVerified(true);

      // Display the verification message from the server
      setVerificationMessage(true);

    } catch (error) {
      // If verification fails, set a failure message
      setVerificationMessage(false);
    }

  } else {
    // If no OTP is entered, alert the user
    toast("Enter a Value");
  }
};

const handleNavigation = async () => {
  // Check if the email is verified and required fields are filled
  if (isEmailVerified && userName.inputValue !== '' && password.inputValue !== '' && dateofBirth) {
    try {
      // Make an API request to save the user details
      const userResponse = await axios.post(
        saveUser, // API endpoint for saving the user
        {
          email: email.inputValue, // User's email
          userName: userName.inputValue, // User's name
          password:password.inputValue,
          dateOfBirth:dateofBirth
        }
      );

      // Store the user ID in sessionStorage
      sessionStorage.setItem('userId', userResponse.data.id);

      // If the response status is 200 (OK), navigate to the phone verification page
      if (userResponse.status === 200) {
        routes.push('registration/verifyPhone');
      }

    } catch (error: any) {
      // Log the error for debugging
      console.log(error);

      // Display an error message to the user via a toast notification
      toast(error?.response.data.message || "An error occurred");
    }

  } else {
    // Show a toast notification if required fields are not filled
    toast("Please Fill The Details");
  }
};


// Date and  its Valodations
const handleCalendarDateChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
  setDateofBirth(e.target.value)

  const selectedDate = new Date(e.target.value);
  const today = new Date();

  setDateError("");

  if (!e.target.value) {
    setDateError("Date of Birth cannot be empty.");
    return;
  }
  if (selectedDate > today) {
    setDateError("Date of Birth cannot be in the future.");
    return;
  }
}
    
  return (
        <form  className={registrationPageStyles.registerFormStyles}    onSubmit={handleFormSubmission} >
                         <>
                         {/* User Name */}
                            <Input startIcon="/icons/userIcon.svg" placeholder="Enter the user name" error={isUserNameInValid} handleBlur={userName.handleBlur} handleChange={userName.handleChange} value={userName.inputValue} />
                       {/* Handling the User date of birth */}
                         <div className={registrationPageStyles.dateContainer}>
                        <input  type="date"  className={registrationPageStyles.calendarinput}  value={dateofBirth}   onChange={handleCalendarDateChange} 
                           />
                        {dateError && <span className={registrationPageStyles.errorMessage}>{dateError}</span>}
                        </div>

                         {/* User Otp Verfication Name */}
                           <div className={registrationPageStyles.verifyContainer}>
                           <Input  startIcon="/icons/emailIcon.svg" error={isUserEmailInValid} placeholder="Enter Email" handleBlur={email.handleBlur} handleChange={email.handleChange} value={email.inputValue} verifyButton={true}/>
                         

                         {  showVerfiyButton && <button className={registrationPageStyles.verify} onClick={handleOtpVerification} disabled={isSending}>{isSending?"Sedning":"Send otp"}</button>}
                           </div>

                           <Input startIcon="/icons/passwordSvg.svg" placeholder="Enter Password" error={isPasswordInValid} type='password' handleBlur={password.handleBlur} handleChange={password.handleChange} value={password.inputValue} />

                          
                           { isOtpBoxVisible && <OtpInput isSuccess={verificationMessage}  onClick={verifyEmail} onChange={OtpNumber.handleChange} inputValue={OtpNumber.inputValue}/> }
                            </>
                        
                        <Button className={registrationPageStyles.customButtonStyles}  onClick={handleNavigation}>Next</Button>
                        <ToastContainer />
        </form>
        
    // </div>
  )
}

export default ResgistrationPage
