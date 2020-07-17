import React from "react";
import { SideBar } from "./components/SideBar";
import { Switch, Route, Redirect } from "react-router-dom";
import { EditingContextWrapper } from "./EditingContext";
import { ProductsPage } from "./components/ProductsPage";
import { EditingPage } from "./components/EditingPage";
import { LoginPage } from "./components/LoginPage";
import { CreateUser } from "./components/CreateUser";

export const useRoutes = (isAuth: boolean) =>
  isAuth ? (
    <div className="wrapper">
      <SideBar />
      <div className="App">
        <Switch>
          <Route path="/products" exact component={ProductsPage} />
          <EditingContextWrapper>
            <Route path="/edit/:id" exact component={EditingPage} />
            <Route path="/new" exact component={EditingPage} />
          </EditingContextWrapper>
        </Switch>
      </div>
    </div>
  ) : (
    <Route path="/login" exact component={LoginPage} />
  );
