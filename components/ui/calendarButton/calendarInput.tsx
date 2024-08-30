'use client'

import { useState } from 'react'
import Image from 'next/image'

// import { CalendarInputProps } from '@/types/Types'

import calendarInputStyles from './calendarInput.module.css'

export type CalendarInputProps ={ icon?: string,children:React.ReactNode,valuess:any,handleChange:any}

const CalendarInput = ({icon,children,valuess,handleChange}:CalendarInputProps) => {


  // to change the background of the button based on the on variant recived from the user  


  // to store the Date and Time
  //  const[datetime,setDateTime]=useState<string>('');

  //  to show  show the date and time picker
   const[showDateTimeInput,setShowDateTimeInput]=useState(false);

    // Handler to toggle the visibility of the date and time picker input
  const showTimeHandler=()=>{
    setShowDateTimeInput(prev=>!prev);
  }   

   const handleDateTimeChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    // setDateTime(event.target.value);
    setShowDateTimeInput(false);
    handleChange(event.target.value)
  };
  
  return (
      //  Container for the calendar input component 
    <div className={calendarInputStyles.calendarContainer}>
          <button  onClick={showTimeHandler}  className={calendarInputStyles.buttonStyles} >{valuess?valuess:children}</button>

           {/* Conditionally render the date and time picker input if showDateTimeInput is true */}

        { showDateTimeInput && <input  type="date"  defaultValue={'2018-06-12'}  className={`${calendarInputStyles.calendarStyles} `}    onChange={handleDateTimeChange}/>}
        {icon && <Image className={calendarInputStyles.startIcon} src={icon} width={20} height={20} alt='Calendar-icon'/>}
    </div>
  )
}

export default CalendarInput
