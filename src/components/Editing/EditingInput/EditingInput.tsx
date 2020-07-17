import React from "react";
import "./EditingInput.scss";
import cn from "classnames";
interface Props {
  placeholder: string;
  value: string;
  name: string;
  error: boolean;
  setError: (value: boolean, name: string) => void;
  setValue: (value: string, name: string) => void;
  validation: (field: string) => void;
}

export const EditingInput: React.FC<Props> = ({
  placeholder,
  value,
  name,
  setValue,
  error,
  setError,
  validation,
}) => (
  <input
    type="text"
    placeholder={placeholder}
    className={cn({
      EditingInput__Input: true,
      "EditingInput__Input--error": error,
      "EditingInput__Input--success": !error && value,
    })}
    value={value}
    name={name}
    onChange={(e) => {
      setValue(e.target.value, e.target.name);
      setError(false, e.target.name);
    }}
    onBlur={(e) => validation(e.target.name)}
  />
);
