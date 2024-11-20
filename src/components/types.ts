export type FieldProps = {
  onChange?: (value: string) => void
  defaultValue?: string
  name?: string
  placeholder?: string
  value?: string
  disabled?: boolean
};

export type FieldValidateProps = {
  required?: boolean
  requiredErrorMessage?: string; 
  onInvalid?: (error: string) => void
}

export type InputValidateProps = {
  pattern?: RegExp
  validateErrorMessage?: string
} & FieldValidateProps;

export type InputProps = FieldProps & InputValidateProps

export type SelectProps = {
  list?: OptionObject[] | string[]
  showError?: boolean
} & FieldProps & FieldValidateProps

export type OptionObject = {
  title: string
  value: string
}

export type FormEvent = React.FormEvent<HTMLFormElement>

