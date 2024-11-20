import { useRef, useState } from "react";
import { SelectProps, OptionObject } from "../types";
import useValidate from "../hooks/useValidate";

export default function Select({
  list,
  name,
  value,
  disabled,
  required,
  requiredErrorMessage,
  onChange,
  onInvalid,
  placeholder,
  showError = true
}: SelectProps) {
  // const [_value, setValue] = useState<string>(defaultValue || '');
  const selectRef = useRef(null);

  const isObject = list && typeof list[0] === 'object';
  const options: React.ReactElement[] = [];

  if (isObject) {
    // @ts-ignore
    list?.forEach((option: OptionObject) => {
      options.push(<option key={option.value} value={option.value}>{ option.title }</option>);
    });
    } else {
    // @ts-ignore
    list?.forEach((option: string) => {
      options.push(<option key={option} value={option}>{ option }</option>);
    })
  };

  const handlerOnChange = (e: any) => {
    // @ts-ignore
    selectRef.current?.blur();
    const newValue = e.target.value;
    if (onChange) onChange(newValue);
  };

  const handlerOnBlur = (e: any) => {
    validate(e.target.value);
  };

  const [error, validate, handlerOnFocus] = useValidate({
    required,
    requiredErrorMessage,
    onInvalid
  });

  return (
    <>
      <div className={`field-select field ${error && 'field--error'}`}>
        <select
          disabled={disabled}
          required={required}
          value={value}
          ref={selectRef}
          className={`select field__item ${!value && 'select--empty'}`}
          name={name}
          onChange={handlerOnChange}
          onBlur={handlerOnBlur}
          onInvalid={handlerOnBlur}
          onFocus={handlerOnFocus}
        >
          <option style={{display: 'none'}} value={''}>{ placeholder }</option>
        {
          options.map(option => option)
        }
        </select>
        <div className="field-select__icon">
          <img src="/arrow.png"/>
        </div>
        { showError && error && (<div className="field-error">{ error }</div>) }
      </div>
    </>
  );
};