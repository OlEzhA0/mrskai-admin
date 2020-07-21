import React from "react";
import "./ProdSpinner.scss";

export const ProdSpinner = () => (
  <div className="ProdSpinner">
    <div className="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
);
