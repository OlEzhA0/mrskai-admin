import React, { useContext, useEffect } from "react";
import { AppContext } from "./context/appContext";
import { PopupDeleteProduct } from "./components/Products/PopupDeleteProduct";
import { useRoutes } from "./routes/routes";
import "./styles/index.scss";
import { AuthContext } from "./context/authContext";
import { useAuth } from "./hooks/auth.hook";
import { useQuery } from "react-apollo";
import { getUserQuery } from "./query";

const App = () => {
  const { deletePopup, bachgroundCover, setUserInfo } = useContext(
    AppContext
  );
  const { login, logout, token, userId } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);
  const { data } = useQuery(getUserQuery, {
    variables: { id: userId },
  });

  useEffect(() => {
    if (data && data.user) {
      setUserInfo(data.user);
    }
  }, [data && data.user]);

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
