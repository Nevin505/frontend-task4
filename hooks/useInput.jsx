import { useState } from "react"

const useInput = (intialValue) => {

  const[inputValue,setInputValue]=useState(intialValue);


  const[didEdit,setDidEdit]=useState(false)

  const handleChange=(e)=>{
    setInputValue(e.target.value);
    setDidEdit(false)
  }
  const handleBlur=()=>{
      setDidEdit(true);
  }
  return {inputValue,handleChange,handleBlur,didEdit}
}

export default useInput
