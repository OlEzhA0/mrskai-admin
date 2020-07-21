export const filterProducts = (
  sortByParam: string,
  defaultSortBy: string,
  products: Products[]
) => {
  if (sortByParam === defaultSortBy) {
    return [...products].sort((a, b) => +b.timestamp - +a.timestamp);
  }

  return products
    .filter((product) => product.type === sortByParam)
    .sort((a, b) => +b.timestamp - +a.timestamp);
};
