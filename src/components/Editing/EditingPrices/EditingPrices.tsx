import React from "react";
import "./EditingPrices.scss";
import cn from 'classnames';

interface Props {
  price: string;
  lastPrice: string;
  namePrice: string;
  nameLastPrice: string;
  setValues: (value: string, name: string) => void;
  setError: (value: boolean, name: string) => void;
  errorPrice: boolean;
}

export const EditingPrices: React.FC<Props> = ({
  price,
  lastPrice,
  namePrice,
  nameLastPrice,
  setValues,
  setError,
  errorPrice,
}) => {
  const handleChangeValue = (name: string, value: string) => {
    setValues(value.replace(/\D/g, ""), name);
    setError(false, name);
  };

  const handleBlur = (value: string, name: string) => {
    if (!value) {
      setError(true, name);
    }
  };

  return (
    <div className="EditingPrices">
      <input
        type="text"
        className={cn({
          "EditingPrices__Input": true,
          "EditingPrices__Input--error": errorPrice,
          "EditingPrices__Input--success": !errorPrice && price,
        })}
        placeholder="Текущая цена"
        name={namePrice}
        value={price}
        onChange={(e) => handleChangeValue(e.target.name, e.target.value)}
        onBlur={(e) => handleBlur(e.target.value, e.target.name)}
      />
      <input
        type="text"
        className="EditingPrices__Input"
        placeholder="Старая цена"
        name={nameLastPrice}
        value={lastPrice}
        onChange={(e) => handleChangeValue(e.target.name, e.target.value)}
      />
    </div>
  );
};
