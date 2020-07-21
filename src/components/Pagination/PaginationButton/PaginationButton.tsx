import React from "react";
import "./PaginationButton.scss";
import cn from "classnames";
interface Props {
  page: number;
  activePage: number;
  handleChangePage: (page: number) => void;
}

export const PaginationButton: React.FC<Props> = ({
  page,
  activePage,
  handleChangePage,
}) => (
  <li
    className={cn({
      PaginationButton__Item: true,
    })}
  >
    <button
      type="button"
      className={cn({
        PaginationButton__Button: true,
        "PaginationButton__Button--active": page === activePage,
      })}
      onClick={() => handleChangePage(page)}
    >
      {page}
    </button>
  </li>
);
