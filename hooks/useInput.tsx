import { ChangeEvent, useState } from "react"

interface UseInputReturn {
  inputValue: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleBlur: () => void;
  didEdit: boolean;
}


const useInput =(initialValue: string): UseInputReturn  => {

  const[inputValue,setInputValue]=useState(initialValue);


  const[didEdit,setDidEdit]=useState(false)

  const handleChange=(e:ChangeEvent<HTMLInputElement>)=>{
    setInputValue(e.target.value);
    setDidEdit(false)
  }
  const handleBlur=()=>{
      setDidEdit(true);
  }
  return {inputValue,handleChange,handleBlur,didEdit}
}

export default useInput
