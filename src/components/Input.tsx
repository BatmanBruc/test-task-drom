import { InputProps } from "./types";
import useValidate from "./useValidate";

export default function Input({
  name,
  defaultValue,
  pattern,
  required = false,
  requiredErrorMessage,
  validateErrorMessage,
  onChange,
  onInvalid,
  placeholder
}: InputProps) {

  const handlerOnChange = (e: any) => {
    const newValue = e.target.value;
    if (onChange) onChange(newValue);
  }

  const [error, validate, handlerOnFocus] = useValidate({
    required,
    requiredErrorMessage,
    pattern,
    validateErrorMessage,
    onInvalid
  })

  const handlerOnBlur = (e: any) => {
    validate(e.target.value)
  }

  return (
    <>
      <div className={`field-input field ${error && 'field--error'}`}>
        <input
          className="input field__item"
          type="text"
          name={name}
          defaultValue={defaultValue}
          onChange={handlerOnChange}
          onBlur={handlerOnBlur}
          onInvalid={handlerOnBlur}
          onFocus={handlerOnFocus}
          required={required}
          placeholder={placeholder}
        />
        { error && (<div className="field-error">{ error }</div>) }
      </div>
    </>
  )
}