import React, { useMemo, useState, useEffect } from "react";
import "./ProductsSelect.scss";
import { useHistory, useLocation } from "react-router-dom";
import cn from "classnames";

interface Props {
  mainText: string;
  options: string[];
  width: number;
  urlType: string;
}

export const ProductsSelect: React.FC<Props> = ({
  mainText,
  options,
  width,
  urlType,
}) => {
  const defaultSetting = options[0];
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const currentSortType = useMemo(() => searchParams.get(urlType), [
    searchParams, urlType
  ]);

  const currentOptions = options.find((option) => option === currentSortType);
  const [isOpen, setIsOpen] = useState(false);

  const clickSubscribe = () => {
    setIsOpen(false);
  };

  const handleChooseSelectOption = (option: string) => {
    searchParams.set(urlType, option);

    history.push({
      search: searchParams.toString(),
    });

    setIsOpen(false);
  };

  useEffect(() => {
    if (!isOpen) {
      document.documentElement.removeEventListener("click", clickSubscribe);
    } else {
      document.documentElement.addEventListener("click", clickSubscribe);
    }
  }, [isOpen]);

  return (
    <div className="ProductsSelect">
      <p className="ProductsSelect__Title">{mainText}</p>
      <div className="ProductsSelect__Select">
        <div
          className={cn({
            ProductsSelect__Main: true,
            "ProductsSelect__Main--open": isOpen,
          })}
          style={{ width }}
          onClick={() => setIsOpen(!isOpen)}
        >
          <p className="ProductsSelect__MainText">
            {currentOptions || defaultSetting}
          </p>
          {isOpen && (
            <label
              className={cn({
                "ProductsSelect--after": isOpen,
              })}
              style={{ width }}
            />
          )}

          <img
            src="images/products/selectArrow.svg"
            alt="arrow"
            className={cn({
              ProductsSelect__Img: true,
              "ProductsSelect__Img--open": isOpen,
            })}
          />
        </div>
        <ul
          className={cn({
            ProductsSelect__List: true,
            "ProductsSelect__List--open": isOpen,
          })}
          style={{ width }}
        >
          {options
            .filter((option) =>
              currentOptions
                ? option !== currentOptions
                : option !== defaultSetting
            )
            .map((option) => (
              <li key={option} className="ProductsSelect__Item" onClick={() => handleChooseSelectOption(option)}>
                {option}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};
