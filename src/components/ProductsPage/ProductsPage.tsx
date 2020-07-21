import React, { useContext, useEffect, useMemo } from "react";
import { useMutation, useSubscription } from "react-apollo";
import { useHistory, useLocation } from "react-router-dom";
import { AppContext } from "../../context/appContext";
import { addProductMutation, deleteProductMutation } from "../../mutation";
import "./ProductsPage.scss";
import { productsQuery } from "./query";
import { ProductsPageSettings, ProductCard } from "../Products";
import { LoadSpinner } from "../Spinners";

export const ProductsPage = () => {
  const defaultSortBy = "Все товары";
  const sortBy = "sortBy";
  const productsPerPage = "ProductsPerPage";
  const { data, loading } = useSubscription(productsQuery);
  const { checked, clearAllChecked } = useContext(AppContext);
  const [addCloneProducts] = useMutation(addProductMutation);

  const products: Products[] = useMemo(() => {
    if (data && data.products) {
      return data.products;
    } else {
      return [];
    }
  }, [data, data && data.products]);

  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const sortByParam = useMemo(() => searchParams.get(sortBy), [searchParams]);

  const cloneObject = (clone: Products, newTitle: string) => ({
    title: newTitle,
    descr: clone.descr,
    color: clone.color,
    price: clone.price,
    modelParam: clone.modelParam,
    composition: clone.composition,
    sizes: clone.sizes,
    lastPrice: clone.lastPrice,
    type: clone.type,
    photos: [],
    care: clone.care,
    previewPhoto: "",
    timestamp: clone.timestamp,
  });

  const cloneChecked = () => {
    if (!checked.length) {
      return;
    }

    const toClone = products.filter((product) =>
      checked.some((check) => check === product.id)
    );

    toClone.forEach(async (clone) => {
      let newTitle = clone.title;
      if (!clone.title.includes("(копия)")) {
        newTitle += " (копия)";
      }

      await addCloneProducts({
        variables: cloneObject(clone, newTitle),
        refetchQueries: [
          {
            query: productsQuery,
          },
        ],
      });
    });

    clearAllChecked();
  };

  const singleClone = async (id: string) => {
    const clone = products.find((prod) => id === prod.id);
    if (clone) {
      let newTitle = clone.title;
      if (!clone.title.includes("(копия)")) {
        newTitle += " (копия)";
      }

      await addCloneProducts({
        variables: cloneObject(clone, newTitle),
        refetchQueries: [
          {
            query: productsQuery,
          },
        ],
      });
    }
  };

  useEffect(() => {
    if (!sortByParam) {
      searchParams.set(sortBy, defaultSortBy);

      history.push({
        search: searchParams.toString(),
      });
    }
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    if (sortByParam === defaultSortBy) {
      return [...products].sort((a, b) => +b.timestamp - +a.timestamp);
    }

    return products
      .filter((product) => product.type === sortByParam)
      .sort((a, b) => +b.timestamp - +a.timestamp);
  }, [sortByParam, products]);

  return (
    <>
      <div className="ProductsPage Pages__Wrap">
        <h1 className="Pages__Title">Товары</h1>
        <ProductsPageSettings
          sortBy={sortBy}
          productsPerPage={productsPerPage}
          cloneChecked={cloneChecked}
        />
        {loading && (
          <div className="Spinner">
            <LoadSpinner />
          </div>
        )}
        {!loading &&
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              type={product.type}
              price={product.price}
              lastPrice={product.lastPrice}
              previewPhoto={product.previewPhoto}
              descr={product.descr}
              modelParam={product.modelParam}
              composition={product.composition}
              sizes={product.sizes}
              photos={product.photos}
              color={product.color}
              singleClone={singleClone}
            />
          ))}
        {filteredProducts.length === 0 && (
          <p className="ProductsPage__NoProducts">
            {loading ? "Загрузка..." : "Нет товаров."}
          </p>
        )}
      </div>
    </>
  );
};
