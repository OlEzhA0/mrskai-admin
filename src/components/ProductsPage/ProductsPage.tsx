import React, { useContext, useEffect, useMemo } from "react";
import { useMutation, useSubscription } from "react-apollo";
import { useHistory, useLocation } from "react-router-dom";
import { AppContext } from "../../context/appContext";
import { addProductMutation } from "../../mutation";
import { ProductCard, ProductsPageSettings } from "../Products";
import { LoadSpinner } from "../Spinners";
import "./ProductsPage.scss";
import { productsQuery } from "./query";
import {
  cloneObject,
  getTitle,
  sortBy,
  productsPerPage,
  page,
  defaultSortBy,
  defaultPerPage,
  defaultPage,
} from "../../helpers";
import { filterProducts } from "../../helpers/filterProducts";
import { Pagination } from "../Pagination";

export const ProductsPage = () => {
  const { data, loading } = useSubscription(productsQuery);
  const { checked, clearAllChecked } = useContext(AppContext);
  const [addCloneProducts] = useMutation(addProductMutation);

  const products: Products[] = useMemo(() => {
    if (data && data.products) {
      return data.products;
    } else {
      return [];
    }
  }, [data]);

  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const sortByParam = useMemo(() => searchParams.get(sortBy), [searchParams]);

  const currentPerPage = useMemo(() => searchParams.get(productsPerPage), [
    searchParams,
  ]);

  const currentPage = useMemo(() => searchParams.get(page), [searchParams]);

  useEffect(() => {
    if (!sortByParam && !currentPage && !currentPerPage) {
      searchParams.set(sortBy, defaultSortBy);
      searchParams.set(productsPerPage, defaultPerPage);
      searchParams.set(page, defaultPage);

      history.push({
        search: searchParams.toString(),
      });
    }
  }, [searchParams, currentPage, currentPerPage, history, sortByParam]);

  const cloneChecked = () => {
    if (!checked.length) {
      return;
    }

    const toClone = products.filter((product) =>
      checked.some((check) => check === product.id)
    );

    toClone.forEach(async (clone) => {
      let newTitle = getTitle(clone.title);

      await addCloneProducts({
        variables: cloneObject(clone, newTitle),
      });
    });

    clearAllChecked();
  };

  const singleClone = async (id: string) => {
    const clone = products.find((prod) => id === prod.id);
    if (clone) {
      let newTitle = getTitle(clone.title);

      await addCloneProducts({
        variables: cloneObject(clone, newTitle),
      });
    }
  };

  const filteredProducts = useMemo(
    () => filterProducts(sortByParam as string, defaultSortBy, products),
    [sortByParam, products]
  );

  const pagesCount = useMemo(() => {
    let perPage = currentPerPage || defaultPerPage;

    return Math.ceil(filteredProducts.length / +perPage);
  }, [filteredProducts, currentPerPage]);

  const visibleProducts = useMemo(() => {
    const page = currentPage || 1;
    const perPage = currentPerPage || 10;

    if (currentPerPage && +currentPerPage <= 0) {
      searchParams.set(productsPerPage, defaultPerPage);

      history.push({
        search: searchParams.toString(),
      });

      return filteredProducts.slice(
        (+page - 1) * +defaultPerPage,
        +defaultPerPage * +page
      );
    }

    return filteredProducts.slice((+page - 1) * +perPage, +perPage * +page);
  }, [filteredProducts, currentPage, currentPerPage, history, searchParams]);

  return (
    <>
      <div className="ProductsPage Pages__Wrap">
        <h1 className="Pages__Title">Товары</h1>
        <ProductsPageSettings
          sortBy={sortBy}
          productsPerPage={productsPerPage}
          cloneChecked={cloneChecked}
          products={visibleProducts}
        />
        {loading && (
          <div className="Spinner">
            <LoadSpinner />
          </div>
        )}
        {!loading &&
          visibleProducts.map((product) => (
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
        {currentPage &&
          currentPerPage &&
          sortByParam &&
          filteredProducts.length > 0 && <Pagination qty={pagesCount} />}
      </div>
    </>
  );
};
