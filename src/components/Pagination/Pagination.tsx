import React, { useMemo, useContext } from "react";
import "./Pagination.scss";
import { useLocation, useHistory, Redirect } from "react-router-dom";
import { sortBy, productsPerPage, page } from "../../helpers";
import { PaginationButton } from "./PaginationButton";
import { AppContext } from "../../context/appContext";

interface Props {
  qty: number;
}

export const Pagination: React.FC<Props> = ({ qty }) => {
  const { setChecked } = useContext(AppContext);
  const location = useLocation();
  const history = useHistory();
  const searchParams = new URLSearchParams(location.search);

  const currentPage = useMemo(() => Number(searchParams.get(page)), [
    searchParams,
  ]);

  const currentPerPage = useMemo(
    () => Number(searchParams.get(productsPerPage)),
    [searchParams]
  );
  const currentSortBy = useMemo(() => searchParams.get(sortBy), [searchParams]);

  if (currentPage <= 0) {
    return (
      <Redirect
        to={{
          pathname: location.pathname,
          search: `?sortBy=${(currentSortBy || "Все товары").split(
            "+"
          )}&perPage=${currentPerPage}&page=1`,
        }}
      />
    );
  }

  const pages = Array(qty <= 0 ? 1 : qty)
    .fill(0)
    .map((_, i) => i + 1);

  if (pages.length && currentPage > pages.length) {
    return (
      <Redirect
        to={{
          pathname: location.pathname,
          search: `?sortBy=${
            currentSortBy || "Все+товары"
          }&perPage=${currentPerPage}&page=${pages.length}`,
        }}
      />
    );
  }

  const handleChangePage = (newPage: number) => {
    setChecked([]);
    searchParams.set(page, `${newPage}`);

    history.push({
      pathname: location.pathname,
      search: `?sortBy=${
        currentSortBy || "Все+товары"
      }&perPage=${currentPerPage}&page=${newPage}`,
    });
  };

  return (
    <div className="Pagination">
      <ul className="Pagination__List">
        <li className="Pagination__BtnItem">
          <button
            className="Pagination__Item"
            disabled={currentPage === 1}
            onClick={() => handleChangePage(currentPage - 1)}
          >
            <img
              src="images/products/arrowLeft.svg"
              alt="arrow left"
              className="Pagination__ArrowButton Pagination__Arrow"
            />
          </button>
        </li>

        <PaginationButton
          page={1}
          activePage={currentPage}
          handleChangePage={handleChangePage}
        />

        {currentPage > 3 && <span className="Pagination__Dots">...</span>}

        {currentPage > 2 && (
          <PaginationButton
            page={currentPage - 1}
            activePage={currentPage}
            handleChangePage={handleChangePage}
          />
        )}

        {currentPage > 1 && (
          <PaginationButton
            page={currentPage}
            activePage={currentPage}
            handleChangePage={handleChangePage}
          />
        )}

        {currentPage < pages.length - 1 && (
          <PaginationButton
            page={currentPage + 1}
            activePage={currentPage}
            handleChangePage={handleChangePage}
          />
        )}

        {currentPage < pages.length - 2 && (
          <span className="Pagination__Dots">...</span>
        )}

        {currentPage <= pages.length - 1 && (
          <PaginationButton
            page={pages.length}
            activePage={currentPage}
            handleChangePage={handleChangePage}
          />
        )}

        <li className="Pagination__BtnItem">
          <button
            className="Pagination__Item"
            disabled={currentPage === pages.length}
            onClick={() => handleChangePage(currentPage + 1)}
          >
            <img
              src="images/products/arrowRight.svg"
              alt="arrow right"
              className="Pagination__ArrowButton Pagination__Arrow"
            />
          </button>
        </li>
      </ul>
    </div>
  );
};
