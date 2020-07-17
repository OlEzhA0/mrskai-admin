import React, { useContext } from "react";
import { AppContext } from "./appContext";
import { PopupDeleteProduct } from "./components/Products/PopupDeleteProduct";
import { useRoutes } from "./routes";
import "./styles/index.scss";
import { AuthContext } from "./context/authContext";
import { useAuth } from "./hooks/auth.hook";

const App = () => {
  const { deletePopup, bachgroundCover } = useContext(AppContext);
  const { login, logout, token, userId } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);

  return (
    <>
      <AuthContext.Provider
        value={{ login, logout, token, userId, isAuthenticated }}
      >
        {bachgroundCover && <div className="behind__Background" />}

        {deletePopup && bachgroundCover && (
          <>
            <PopupDeleteProduct />
          </>
        )}
        {routes}
      </AuthContext.Provider>
    </>
  );
};

export default App;
