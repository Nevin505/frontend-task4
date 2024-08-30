export const truthyValue=(inputValue="")=>{
      return inputValue.trim();
}

export const regexPatternValidation=(regexPattern,testElement)=>{
  return regexPattern.test(testElement)
}