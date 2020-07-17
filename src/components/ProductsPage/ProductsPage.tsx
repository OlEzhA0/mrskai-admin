import React, { useMemo, useContext, useEffect } from "react";
import "./ProductsPage.scss";
import { ProductsPageSettings } from "../ProductsPageSettings";
import { useMutation, useSubscription, useQuery } from "react-apollo";
import { productsQuery } from "./query";
import { ProductCard } from "../ProductCard";
import { LoadSpinner } from "../LoadSpinner";
import { AppContext } from "../../appContext";
import { addProductMutation, deleteProductMutation } from "../../mutation";
import { useLocation, useHistory } from "react-router-dom";

export const ProductsPage = () => {
  const defaultSortBy = "Все товары";
  const sortBy = "sortBy";
  const productsPerPage = "ProductsPerPage";
  const { data, loading } = useSubscription(productsQuery);
  const { checked, clearAllChecked } = useContext(AppContext);
  const [addCloneProducts] = useMutation(addProductMutation);
  const [deleteChekedProducts] = useMutation(deleteProductMutation);

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
        variables: {
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
        },
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
        variables: {
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
        },
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

  const deleteChecked = () => {
    checked.forEach(async (check) => {
      await deleteChekedProducts({
        variables: { id: check },
        refetchQueries: [{ query: productsQuery }],
      });
    });

    clearAllChecked();
  };

  const filteredProducts = useMemo(() => {
    if (sortByParam === defaultSortBy) {
      return products;
    }

    return products.filter((product) => product.type === sortByParam);
  }, [sortByParam, products]);


  return (
    <>
      <div className="ProductsPage Pages__Wrap">
        <h1 className="Pages__Title">Товары</h1>
        <ProductsPageSettings
          sortBy={sortBy}
          productsPerPage={productsPerPage}
          cloneChecked={cloneChecked}
          deleteChecked={deleteChecked}
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
          <p className="ProductsPage__NoProducts">Нет товаров.</p>
        )}
      </div>
    </>
  );
};
