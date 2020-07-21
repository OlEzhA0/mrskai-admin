import React from "react";
import "./AdminNav.scss";

interface Props {
  name: string;
  img: string;
}

export const AdminNav: React.FC<Props> = ({ name, img }) => (
  <>
    <img src={img} alt={name} className="AdminNav__Img" />
    <p className="AdminNav__Name">{name}</p>
  </>
);
