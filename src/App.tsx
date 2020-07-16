import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import "./styles/index.scss";
import { SideBar } from "./components/SideBar";
import { ProductsPage } from "./components/ProductsPage";
import { AppContext } from "./appContext";
import { EditingPage } from "./components/EditingPage";
import { EditingContextWrapper } from "./EditingContext";
import { PopupDeleteProduct } from "./components/PopupDeleteProduct";

const App = () => {
  const {
    deletePopup,
    bachgroundCover,
  } = useContext(AppContext);

  return (
    <>
      {bachgroundCover && <div className="behind__Background" />}

      {deletePopup && bachgroundCover && (
        <>
          <PopupDeleteProduct />
        </>
      )}
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
    </>
  );
};

export default App;
