import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../../context/appContext";
import { CATEGORY, PER_PAGE } from "../../../helpers";
import { ProductsSelect } from "../ProductsSelect";
import "./ProductsPageSettings.scss";
import cn from "classnames";

interface Props {
  sortBy: string;
  productsPerPage: string;
  cloneChecked: () => void;
  products: Products[];
}

export const ProductsPageSettings: React.FC<Props> = ({
  products,
  sortBy,
  productsPerPage,
  cloneChecked,
}) => {
  const {
    checked,
    clearAllChecked,
    setBackgroundCover,
    deletePopupOpen,
    setChecked,
  } = useContext(AppContext);

  const handleCheckAll = () => {
    if (checked.length !== products.length) {
      setChecked(products.map((prod) => prod.id));
    }
  };

  return (
    <div className="ProductsPageSettings ProdSett">
      <div className="ProdSett__LeftSide">
        {checked.length > 0 ? (
          <div className="ProdSett__CheckedParam">
            <p
              className={cn({
                ProdSett__Param: true,
                "ProdSett__Param--dis": checked.length === products.length,
              })}
              onClick={handleCheckAll}
            >
              Выбрать все
            </p>
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
                deletePopupOpen(true, "");
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
          options={PER_PAGE}
          width={80}
          urlType={productsPerPage}
        />
        <ProductsSelect
          mainText="Категория:"
          options={CATEGORY}
          width={190}
          urlType={sortBy}
        />
      </div>
    </div>
  );
};
