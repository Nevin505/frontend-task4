
'use client'
import otpContainerStyles from './otpInput.module.css';

const OtpInput = ({onClick,onChange,inputValue,isSuccess}:any) => {


  return (
    <div className={otpContainerStyles.otpContainer}>
        <input type="number" onChange={onChange} value={inputValue} maxLength={4} className={otpContainerStyles.inputBox}/>
       { isSuccess!==null && <p className={otpContainerStyles.messageContainer}> {isSuccess ? "Verification Successful" : "Verification Failed"}</p>}
        <button type='button' onClick={onClick}>Verify Otp</button>
    </div>
  )
}

export default OtpInput;
