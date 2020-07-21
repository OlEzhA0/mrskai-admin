import React, { useContext } from "react";
import "./ProductsPageSettings.scss";
import { Link } from "react-router-dom";
import { ProductsSelect } from "../ProductsSelect";
import { typeOptions } from "../../../helpers";
import { AppContext } from "../../../context/appContext";

interface Props {
  sortBy: string;
  productsPerPage: string;
  cloneChecked: () => void;
}

export const ProductsPageSettings: React.FC<Props> = ({
  sortBy,
  productsPerPage,
  cloneChecked,
}) => {
  const perPage = ["10", "20", "30", "Все"];
  const category = ["Все товары", ...typeOptions];
  const {
    checked,
    clearAllChecked,
    setBackgroundCover,
    deletePopupOpen,
  } = useContext(AppContext);

  return (
    <div className="ProductsPageSettings ProdSett">
      <div className="ProdSett__LeftSide">
        {checked.length > 0 ? (
          <div className="ProdSett__CheckedParam">
            <p className="ProdSett__Param" onClick={clearAllChecked}>
              Сброс
            </p>
            <p className="ProdSett__Param" onClick={cloneChecked}>
              <img
                src="images/products/cloneProd.svg"
                alt="clone"
                className="ProdSett__ParamImg"
              />{" "}
              Дублировать ({checked.length})
            </p>
            <p
              className="ProdSett__Param ProdSett__Param--delete"
              onClick={() => {
                setBackgroundCover(true);
                deletePopupOpen(true, '');
              }}
            >
              <img
                src="images/products/deleteProd.svg"
                alt="clone"
                className="ProdSett__ParamImg"
              />{" "}
              Удалить ({checked.length})
            </p>
          </div>
        ) : (
          <Link to="/new" className="ProdSett__AddLink">
            <p className="ProdSett__AddProd">
              <img
                src="images/products/addProd.svg"
                alt="add product"
                className="ProdSett__AddProdImg"
              />
              Добавить товар
            </p>
          </Link>
        )}
      </div>
      <div className="ProdSett__RightSide">
        <ProductsSelect
          mainText="Отображать:"
          options={perPage}
          width={80}
          urlType={productsPerPage}
        />
        <ProductsSelect
          mainText="Категория:"
          options={category}
          width={190}
          urlType={sortBy}
        />
      </div>
    </div>
  );
};
