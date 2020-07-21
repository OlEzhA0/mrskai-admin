import React, { useState, useContext } from "react";
import "./EditingSizes.scss";
import { EditingContext } from "../../../context/EditingContext";
import cn from "classnames";
import { SIZES_CONFIG } from "../../../helpers";

interface Props {
  name: string;
  setError: (value: boolean, name: string) => void;
  error: boolean;
}

export const EditingSizes: React.FC<Props> = ({ name, setError, error }) => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    choosenSizes,
    setSizes,
    changeArticul,
    validationChoosenSizesArticul,
    choosenSizesError,
  } = useContext(EditingContext);

  const handleOpenClose = () => {
    if (isOpen && !choosenSizes.length) {
      setIsOpen(false);
      setError(true, name);
    } else if (!isOpen) {
      setIsOpen(true);
      setError(false, name);
      choosenSizes.forEach((choosenSize) =>
        validationChoosenSizesArticul(choosenSize.size)
      );
    } else {
      setIsOpen(false);
      setError(false, name);
      choosenSizes.forEach((choosenSize) =>
        validationChoosenSizesArticul(choosenSize.size)
      );
    }
  };

  const handleCheckbox = (size: string) => {
    setSizes(size);
    setError(false, name);
  };

  const blurValid = (size: string) => {
    validationChoosenSizesArticul(size);
  };

  return (
    <>
      <div
        className={cn({
          EditingSizes: true,
          "EditingSizes--open": isOpen,
          "EditingSizes--error": !isOpen && error,
          "EditingSizes--success": !error && choosenSizes.length && !isOpen,
        })}
        onClick={handleOpenClose}
      >
        <p className="EditingSizes__Title">
          {choosenSizes.length > 0 ? (
            <span>
              {choosenSizes.map((size) => (
                <span className="EditingSizes__Sizes" key={size.size}>
                  {size.size},{" "}
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
          <li key={size} className="EditingSizes__OptionItem">
            <p
              className="EditingSizes__SizeName"
              onClick={() => handleCheckbox(size)}
            >
              {size}
            </p>
            <div className="EditingSizes__Articul">
              {choosenSizes.some((sizes) => size === sizes.size) && (
                <input
                  type="text"
                  className={cn({
                    EditingSizes__ArticulInp: true,
                    "EditingSizes__ArticulInp--success": choosenSizes.find(
                      (sizes) => sizes.size === size
                    )?.articul,
                    "EditingSizes__ArticulInp--error":
                      !choosenSizes.find((sizes) => sizes.size === size)
                        ?.articul &&
                      choosenSizesError.some(
                        (choosenError) => choosenError === size
                      ),
                  })}
                  placeholder="Артикул"
                  value={
                    choosenSizes.find((sizes) => sizes.size === size)?.articul
                  }
                  onChange={(e) => changeArticul(size, e.target.value)}
                  onBlur={() => blurValid(size)}
                />
              )}
              <input
                type="checkbox"
                checked={choosenSizes.some((sizes) => size === sizes.size)}
                onChange={() => handleCheckbox(size)}
                className="EditingSizes__Checkbox"
              />
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};
