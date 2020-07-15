import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import "./styles/index.scss";
import { SideBar } from "./components/SideBar";
import { ProductsPage } from "./components/ProductsPage";
import { AppContext } from "./appContext";
import { useMutation } from "react-apollo";
import { deleteProductMutation } from "./mutation";
import { productsQuery } from "./components/ProductsPage/query";
import { EditingPage } from "./components/EditingPage";
import { EditingContextWrapper } from "./EditingContext";

const App = () => {
  const { deletePopup, deletePopupOpen, currentId } = useContext(AppContext);
  const [deleteProduct] = useMutation(deleteProductMutation);

  const handleDeleteProduct = async () => {
    await deleteProduct({
      variables: { id: currentId },
      refetchQueries: [{ query: productsQuery }],
    }).then(() => deletePopupOpen(false, ""));
  };

  return (
    <>
      {deletePopup && (
        <>
          <div className="behind__Background" />
          <div className="Delete">
            <p className="Delete__Text">Удалить товар?</p>
            <div className="Delete__Buttons">
              <button
                className="Delete__Button Delete__Button--delete"
                onClick={handleDeleteProduct}
              >
                Удалить
              </button>
              <button
                className="Delete__Button Delete__Button--cancel"
                onClick={() => deletePopupOpen(false, "")}
              >
                Отмена
              </button>
            </div>
          </div>
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
