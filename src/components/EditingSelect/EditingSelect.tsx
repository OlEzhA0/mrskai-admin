import React, { useState } from "react";
import "./EditingSelect.scss";
import cn from "classnames";
import { typeOptions } from "../../helpers";

interface Props {
  currentValue: string;
  name: string;
  error: boolean;
  setValue: (option: string, name: string) => void;
  setError: (option: boolean, name: string) => void;
}

export const EditingSelect: React.FC<Props> = ({
  currentValue,
  name,
  error,
  setValue,
  setError,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const clickSubscribe = () => {
    if (isOpen && !currentValue) {
      setIsOpen(false);
      setError(true, name);
    } else if (!isOpen) {
      setIsOpen(true);
      setError(false, name);
    } else {
      setIsOpen(false);
      setError(false, name);
    }
  };

  const handleChooseOption = (option: string) => {
    setError(false, name);
    setValue(option, name);
    setIsOpen(false);
  };

  return (
    <div className="EditingSelect">
      <div
        className={cn({
          EditingSelect__Main: true,
          "EditingSelect__Main--open": isOpen,
          "EditingSelect__Main--success": currentValue && !isOpen && !error,
          "EditingSelect__Main--error": error,
        })}
        onClick={clickSubscribe}
      >
        <p
          className={cn({
            EditingSelect__MainText: true,
            "EditingSelect__MainText--default": !currentValue,
          })}
        >
          {currentValue || "Категория"}
        </p>
        <img
          src="images/products/selectArrow.svg"
          alt="arrow"
          className={cn({
            EditingSelect__Arrow: true,
            "EditingSelect__Arrow--down": isOpen,
          })}
        />
      </div>
      <ul
        className={cn({
          EditingSelect__List: true,
          "EditingSelect__List--open": isOpen,
        })}
      >
        {typeOptions
          .filter((option) => option !== currentValue)
          .map((option) => (
            <li
              key={option}
              className="EditingSelect__Item"
              onClick={() => handleChooseOption(option)}
            >
              {option}
            </li>
          ))}
      </ul>
    </div>
  );
};
