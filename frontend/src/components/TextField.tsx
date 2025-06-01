import { ChangeEvent } from 'react'

interface TextFieldProps {
  label: string,
  value?: string,
  inputName: string,
  isEditable: boolean,
  autoFocus?: boolean,
  required?: boolean,
  onUpdate?: (event: ChangeEvent<HTMLInputElement>) => void,
}

const TextField = ({
  label,
  value,
  inputName,
  isEditable,
  autoFocus = false,
  required = false,
  onUpdate,
}: TextFieldProps) => {
  return (
    <>
      {isEditable &&
        <label>
          <strong>{label}</strong>
          <input
            data-testid={`${inputName}-input`}
            className="w-full outline rounded-sm p-1"
            type="text"
            name={inputName}
            defaultValue={value}
            autoFocus={autoFocus}
            required={required}
            onChange={onUpdate}
          />
        </label>
      }
      {!isEditable && value &&
        <span
          data-testid={`${inputName}-text`}
          className="w-full h-full p-0.5 break-normal lg:h-auto">
          {value}
        </span>
      }
    </>
  )
}

export default TextField
