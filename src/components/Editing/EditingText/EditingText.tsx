import React, { useContext } from "react";
import "./EditingText.scss";
import cn from "classnames";
import { EditingContext } from "../../../context/EditingContext";

interface Props {
  placeholder: string;
  value: string;
  name: string;
  setValue: (value: string, name: string) => void;
  setError: (value: boolean, name: string) => void;
  error: boolean;
  validation: (name: string) => void;
}

export const EditingText: React.FC<Props> = ({
  placeholder,
  validation,
  value,
  setValue,
  setError,
  name,
  error,
}) => {

  return (
    <>
      <textarea
        className={cn({
          EditingText: true,
          "EditingText--error": error && !value,
          "EditingText--success": !error && value,
        })}
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={(e) => {
          setValue(e.target.value, e.target.name);
          setError(false, e.target.name);
        }}
        onBlur={e => validation(e.target.name)}
      ></textarea>
    </>
  );
};
