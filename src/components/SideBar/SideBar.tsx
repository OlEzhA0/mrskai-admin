import React from "react";
import "./SideBar.scss";
import { ADMIN_PANEL_NAV } from "../../helpers";
import { AdminNav } from "../AdminNav";
import { NavLink, useLocation } from "react-router-dom";
import cn from "classnames";

export const SideBar = () => {
  const location = useLocation();

  return (
    <div className="SideBar">
      <div className="SideBar__PanelLogo">
        <p className="SideBar__PanelLogoText">Панель управления</p>
      </div>
      <p className="SideBar__Nav">Навигация</p>
      <ul className="SideBar__NavList">
        {Object.keys(ADMIN_PANEL_NAV).map((key) => (
          <NavLink
            to={ADMIN_PANEL_NAV[key].link}
            className="SideBar__NavLink"
            key={key}
          >
            <li
              className={cn({
                SideBar__NavItem: true,
                SideBar__ActiveNavLink:
                  location.pathname === ADMIN_PANEL_NAV[key].link,
              })}
            >
              <AdminNav
                name={ADMIN_PANEL_NAV[key].name}
                img={ADMIN_PANEL_NAV[key].img}
              />
            </li>
          </NavLink>
        ))}
      </ul>
      <div className="SideBar__Logout">
        <p className="SideBar__LogoutText">Выйти</p>
      </div>
    </div>
  );
};
