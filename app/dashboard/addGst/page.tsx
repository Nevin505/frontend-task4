"use client"
import Input from "@/components/ui/input";
import useInput from "@/hooks/useInput";

import gstPageStyles from './gstPageStyles.module.css'

const AddGstPage = () => {
    const gstNumber=useInput();
  return (
    <div className={gstPageStyles.gstContainer}>
      {/* <div> */}
      <Input type="text" value={gstNumber.inputValue} handleChange={gstNumber.handleChange} placeholder="Enter Yout Gstin Number" />
      <button>Verfiy</button>
      {/* </div> */}
    </div>
  )
}

export default AddGstPage;
