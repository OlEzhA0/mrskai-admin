import React, { useContext } from "react";
import "./PopupSuccessNew.scss";
import { Link } from "react-router-dom";
import { AppContext } from "../../../context/appContext";

interface Props {
  addMore: () => void;
  title: string;
  buttonText: string;
  link: string;
}

export const PopupSuccessNew: React.FC<Props> = ({
  addMore,
  title,
  buttonText,
  link,
}) => {
  const { setBackgroundCover } = useContext(AppContext);
  return (
    <div className="EditingPage__Success">
      <p className="EditingPage__SuccessText">{title}</p>
      <div className="EditingPage__SuccessLinkBlock">
        <Link
          to="/products"
          className="EditingPage__SuccessButton EditingPage__SuccessBack"
          onClick={() => setBackgroundCover(false)}
        >
          В каталог
        </Link>
        <Link
          to={link}
          className="EditingPage__SuccessButton EditingPage__SuccessNew"
          onClick={addMore}
        >
          {buttonText}
        </Link>
      </div>
    </div>
  );
};
