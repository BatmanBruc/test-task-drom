import { useState } from "react"
import { InputValidateProps } from "./types";

export default function useInput({
  required,
  requiredErrorMessage,
  pattern,
  validateErrorMessage,
  onInvalid
}: InputValidateProps): [string, (e: any) => void, () => void] {

  const [error, setError] = useState<string>('');

  const validate = (value: any) => {
    let strError = '';
    if (!value && required){
      strError = requiredErrorMessage ? requiredErrorMessage : 'Поле должно быть заполнено'
    } else if(value && pattern) {
      if (!pattern.test(value))
        strError = validateErrorMessage || ''
    }
    setError(strError)
    if (onInvalid) onInvalid(strError)
  }

  const handlerOnFocus = () => {
    setError('')
    if (onInvalid) onInvalid('')
  }

  return [error, validate, handlerOnFocus];
}