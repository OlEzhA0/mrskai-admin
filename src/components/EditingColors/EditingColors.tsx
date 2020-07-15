import React, { useState, useMemo } from "react";
import "./EditingColors.scss";
import cn from "classnames";
import { COLORS } from "../../helpers";

interface Props {
  currentColor: string;
  setValue: (value: string, name: string) => void;
  setError: (value: boolean, name: string) => void;
  error: boolean;
  name: string;
}

export const EditingColros: React.FC<Props> = ({
  currentColor,
  name,
  setError,
  setValue,
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const setCurrentColor = (color: string) => {
    setValue(color, name);
    setError(false, name);
    setIsOpen(false);
  };

  const handleOpenClose = () => {
    if (isOpen && !currentColor) {
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

  const currentColorHex = useMemo(() => {
    if (currentColor) {
      return COLORS.find((color) => color.name === currentColor)?.hex;
    } else {
      return "";
    }
  }, [currentColor]);

  return (
    <div className="EditingColors">
      <div
        className={cn({
          EditingColors__Select: true,
          "EditingColors__Select--open": isOpen,
          "EditingColors__Select--error": !isOpen && !currentColor && error,
          "EditingColors__Select--success": !isOpen && currentColor && !error,
        })}
        onClick={handleOpenClose}
      >
        <p className="EditingColors__Main">
          {currentColor || <span className="EditingColors__Default">Цвет</span>}
        </p>
        <img
          src="images/products/selectArrow.svg"
          alt="arrow"
          className={cn({
            EditingColors__Arrow: true,
            "EditingColors__Arrow--down": isOpen,
          })}
        />
      </div>
      <div className="EditingColors__PreviewColor" style={{background: currentColorHex}} />
      <ul
        className={cn({
          EditingColors__List: true,
          "EditingColors__List--open": isOpen,
        })}
      >
        {COLORS.filter((color) => color.name !== currentColor).map((color) => (
          <li
            key={color.name}
            className="EditingColors__Item"
            onClick={() => setCurrentColor(color.name)}
          >
            {color.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
