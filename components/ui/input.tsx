import inputStyle from './input.module.css'

import Image from 'next/image'

interface InputProps {
  // inputValue: string| undefined;
  startIcon?: string|undefined;
  value:string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  handleBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: boolean|string;
  verifyButton?: boolean;
  type?: string; // defaults to "text"
}

const Input :React.FC<InputProps>= ({value,startIcon,handleChange,placeholder,handleBlur,error,verifyButton,type="text"}) => {  

  return (
    // Input box used fro verfication and to enter the input Values
    <div className={inputStyle.inputContainer}>
         <input type={type}  placeholder={placeholder}  value={value}  onChange={handleChange} onBlur={handleBlur}/>
         {/* To Verify the field using Otp */}
     
      {  startIcon && <Image src={startIcon} width={20} height={20} alt='Start-Icon' className={inputStyle.startIcon}/>}
    {   error &&  <p className={inputStyle.errorMessageContainer}>{error}</p>}
    </div>
  )
}

export default Input
