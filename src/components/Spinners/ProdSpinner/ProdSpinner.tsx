import React from "react";
import "./ProdSpinner.scss";

export const ProdSpinner = () => {
  return (
    <div className="ProdSpinner">
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
