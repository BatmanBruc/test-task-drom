import InputMask from 'react-input-mask';
import { InputProps } from "../types";
import useValidate from "../hooks/useValidate";

export default function InputPhone({
  name,
  value,
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
    if (onChange) onChange(newValue.replace(/[^0-9]/g, ''));
  };

  const [error, validate, handlerOnFocus] = useValidate({
    required,
    requiredErrorMessage,
    pattern,
    validateErrorMessage,
    onInvalid
  });

  const handlerOnBlur = (e: any) => {
    validate(e.target.value.replace(/[^0-9]/g, ''));
  };

  return (
    <>
      <div className={`field-input field ${error && 'field--error'}`}>
        <InputMask
          className="input field__item"
          name={name}
          maskChar=" "
          mask="+7\(999)999-99-99"
          value={value}
          onChange={handlerOnChange}
          onBlur={handlerOnBlur}
          onFocus={handlerOnFocus}
          alwaysShowMask={false}
          placeholder={placeholder}
        />
        { error && (<div className="field-error">{ error }</div>) }
      </div>
    </>
  );
};