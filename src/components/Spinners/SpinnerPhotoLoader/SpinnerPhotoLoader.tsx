import React from "react";
import "./SpinnerPhotoLoader.scss";

export const SpinnerPhotoLoader = () => (
  <div className="SpinnerPhotoLoader">
    <div className="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
);
