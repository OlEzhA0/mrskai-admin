import React, { useContext } from "react";
import "./PopupDeleteProduct.scss";
import { AppContext } from "../../appContext";
import { useMutation } from "react-apollo";
import { deleteProductMutation } from "../../mutation";
import { productsQuery } from "../ProductsPage/query";
import { Link, useLocation } from "react-router-dom";

export const PopupDeleteProduct = () => {
  const { setBackgroundCover, deletePopupOpen, currentId } = useContext(
    AppContext
  );
  const [deleteProduct] = useMutation(deleteProductMutation);

  const handleDeleteProduct = async () => {
    await deleteProduct({
      variables: { id: currentId },
      refetchQueries: [{ query: productsQuery }],
    }).then(() => deletePopupOpen(false, ""));
  };

  const location = useLocation();
  const isProductPage = location.pathname.includes("/products");

  return (
    <div className="Delete">
      <p className="Delete__Text">Удалить товар?</p>
      <div className="Delete__Buttons">
        {isProductPage ? (
          <button
            className="Delete__Button Delete__Button--delete"
            onClick={() => {
              handleDeleteProduct();
              setBackgroundCover(false);
            }}
          >
            Удалить
          </button>
        ) : (
          <Link
            to="/products?sortBy=Все+товары"
            className="Delete__Button Delete__Button--delete Delete__Button--link"
            onClick={() => {
              handleDeleteProduct();
              setBackgroundCover(false);
            }}
          >
            Удалить
          </Link>
        )}

        <button
          className="Delete__Button Delete__Button--cancel"
          onClick={() => {
            deletePopupOpen(false, "");
            setBackgroundCover(false);
          }}
        >
          Отмена
        </button>
      </div>
    </div>
  );
};
