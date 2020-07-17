import React, { useState, useContext } from "react";
import "./EditingSizes.scss";
import { EditingContext } from "../../../EditingContext";
import cn from "classnames";
import { SIZES_CONFIG } from "../../../helpers";

interface Props {
  name: string;
  setError: (value: boolean, name: string) => void;
  error: boolean;
}

export const EditingSizes: React.FC<Props> = ({ name, setError, error }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { choosenSizes, setSizes } = useContext(EditingContext);

  const handleOpenClose = () => {
    if (isOpen && !choosenSizes.length) {
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

  const handleCheckbox = (size: string) => {
    setSizes(size);
    setError(false, name);
  };

  return (
    <>
      <div
        className={cn({
          EditingSizes: true,
          "EditingSizes--open": isOpen,
          "EditingSizes--error": error,
          "EditingSizes--success": !error && choosenSizes.length && !isOpen,
        })}
        onClick={handleOpenClose}
      >
        <p className="EditingSizes__Title">
          {choosenSizes.length > 0 ? (
            <span>
              {choosenSizes.map((size) => (
                <span className="EditingSizes__Sizes" key={size}>
                  {size},{" "}
                </span>
              ))}
            </span>
          ) : (
            <span className="EditingSizes__DefaultTitle">Размеры</span>
          )}
          <img
            src="images/products/selectArrow.svg"
            alt="arrow"
            className={cn({
              EditingSizes__Arrow: true,
              "EditingSizes__Arrow--down": isOpen,
            })}
          />
        </p>
      </div>
      <ul
        className={cn({
          EditingSizes__OptionList: true,
          "EditingSizes__OptionList--open": isOpen,
        })}
      >
        {SIZES_CONFIG.map((size) => (
          <li
            key={size}
            className="EditingSizes__OptionItem"
            onClick={() => handleCheckbox(size)}
          >
            {size}
            <input
              type="checkbox"
              checked={choosenSizes.some((sizes) => size === sizes)}
              onChange={() => handleCheckbox(size)}
              className="EditingSizes__Checkbox"
            />
          </li>
        ))}
      </ul>
    </>
  );
};
